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

export async function getLiveVideoId(): Promise<string | null> {
  try {
    const response = await fetch(`https://www.youtube.com/${CHANNEL.handle}/live`, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; SoloGamingnpSite/1.0)" },
      next: { revalidate: 60 },
    });

    if (!response.ok) return null;

    const html = await response.text();
    if (!/"isLive":true/.test(html)) return null;

    return html.match(/"videoId":"([A-Za-z0-9_-]{11})"/)?.[1] ?? null;
  } catch {
    return null;
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
