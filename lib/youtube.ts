import {
  CHANNEL,
  FALLBACK_VIDEOS,
  LOCAL_THUMBS,
  tagForTitle,
  type Video,
} from "./channel";

const ENTITIES: Record<string, string> = {
  "&amp;": "&",
  "&quot;": '"',
  "&#39;": "'",
  "&apos;": "'",
  "&lt;": "<",
  "&gt;": ">",
};

const decode = (value: string) =>
  value.replace(/&(amp|quot|#39|apos|lt|gt);/g, (entity) => ENTITIES[entity]);

function parseFeed(xml: string): Video[] {
  return [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)]
    .map(([, entry]) => {
      const grab = (pattern: RegExp) => entry.match(pattern)?.[1] ?? "";
      const id = grab(/<yt:videoId>(.*?)<\/yt:videoId>/);
      const title = decode(grab(/<media:title>(.*?)<\/media:title>/));
      const published = grab(/<published>(.*?)<\/published>/);
      const views = Number(grab(/views="(\d+)"/));

      if (!id || !title || !published) return null;

      return {
        id,
        title,
        published,
        views,
        tag: tagForTitle(title),
        thumb: LOCAL_THUMBS.has(id)
          ? `/assets/videos/${id}.jpg`
          : `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
      } satisfies Video;
    })
    .filter((video): video is Video => video !== null);
}

// Public InnerTube key used by youtube.com's own web client.
const INNERTUBE_KEY = "AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8";
const VIDEO_ID = /^[A-Za-z0-9_-]{11}$/;

type JsonObject = Record<string, unknown>;

function isObject(value: unknown): value is JsonObject {
  return typeof value === "object" && value !== null;
}

/**
 * YouTube's /@handle/live HTML is a JS-only shell for datacenter IPs (Vercel),
 * so read the same InnerTube payload the web player uses. When the channel is
 * live it renders a featured lockup marked with a LIVE thumbnail badge.
 */
function liveIdFromInnerTube(payload: unknown): string | null {
  const featured: unknown[] = [];

  const findFeatured = (node: unknown) => {
    if (!isObject(node)) return;
    const renderer = node.channelFeaturedContentRenderer;
    if (isObject(renderer) && Array.isArray(renderer.items)) featured.push(...renderer.items);
    for (const value of Object.values(node)) findFeatured(value);
  };
  findFeatured(payload);

  for (const item of featured) {
    const videoIds: string[] = [];
    let live = false;

    const scan = (node: unknown) => {
      if (!isObject(node)) return;
      if (node.badgeStyle === "THUMBNAIL_OVERLAY_BADGE_STYLE_LIVE") live = true;
      if (isObject(node.watchEndpoint) && typeof node.watchEndpoint.videoId === "string") {
        videoIds.push(node.watchEndpoint.videoId);
      }
      if (typeof node.contentId === "string") videoIds.push(node.contentId);
      for (const value of Object.values(node)) scan(value);
    };
    scan(item);

    if (!live) continue;
    const id = videoIds.find((candidate) => VIDEO_ID.test(candidate));
    if (id) return id;
  }

  return null;
}

async function liveIdFromInnerTubeRequest(): Promise<string | null> {
  const response = await fetch(
    `https://www.youtube.com/youtubei/v1/browse?key=${INNERTUBE_KEY}&prettyPrint=false`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": "en-US,en;q=0.9",
        Origin: "https://www.youtube.com",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
      },
      body: JSON.stringify({
        context: {
          client: { clientName: "WEB", clientVersion: "2.20241126.01.00", hl: "en", gl: "US" },
        },
        browseId: CHANNEL.channelId,
      }),
      cache: "no-store",
    },
  );

  if (!response.ok) return null;
  return liveIdFromInnerTube(await response.json());
}

async function liveIdFromChannelPage(): Promise<string | null> {
  const response = await fetch(`https://www.youtube.com/${CHANNEL.handle}/live`, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; SoloGamingnpSite/1.0)" },
    cache: "no-store",
  });
  if (!response.ok) return null;

  const html = await response.text();

  // A waiting room reports isLive but not isLiveNow, so require the latter.
  if (!/"liveBroadcastDetails":\{[^}]*"isLiveNow":true/.test(html)) return null;

  // Read the player's video id, not the first id on the page (recommendations).
  return html.match(/"videoDetails":\{"videoId":"([A-Za-z0-9_-]{11})"/)?.[1] ?? null;
}

export async function getLiveVideoId(): Promise<string | null> {
  try {
    return (await liveIdFromInnerTubeRequest()) ?? (await liveIdFromChannelPage());
  } catch {
    try {
      return await liveIdFromChannelPage();
    } catch {
      return null;
    }
  }
}

export async function getVideos(): Promise<Video[]> {
  try {
    const response = await fetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL.channelId}`,
      {
        headers: { "User-Agent": "Mozilla/5.0 (compatible; SoloGamingnpSite/1.0)" },
        next: { revalidate: 1800 },
      },
    );

    if (!response.ok) throw new Error(`YouTube feed responded ${response.status}`);

    const videos = parseFeed(await response.text());
    if (videos.length === 0) throw new Error("YouTube feed was empty");

    return videos;
  } catch {
    return FALLBACK_VIDEOS;
  }
}
