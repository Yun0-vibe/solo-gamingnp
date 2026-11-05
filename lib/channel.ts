export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://solo-gamingnp.vercel.app";

export const CHANNEL = {
  name: "Solo Gamingnp",
  handle: "@sologamingnp",
  url: "https://www.youtube.com/@sologamingnp",
  liveUrl: "https://www.youtube.com/@sologamingnp/live",
  channelId: "UC5I_8IX9jWa6bHCatWY3-0A",
  subscribers: "1.27K",
  started: "2023",
  tagline: "Nepali gaming, rank pushes & pure gang energy.",
  description:
    "Valorant rank pushes, Roblox nights, Minecraft SMP and full-squad chaos — daily gaming from Nepal with the gang.",
  discord: "https://discord.gg/rUEUTxbBuR",
  instagram: "https://www.instagram.com/ig_solonp/",
  x: "https://x.com/SoloNp007",
  tiktok: "https://www.tiktok.com/@solo_gamingnp",
  tipUrl: "https://kamauchanepali.com/tip/almighty",
  tipNumber: "9741803194",
  fantech: "https://www.fantech.com.np/?ref=Solo",
};

export const SOCIALS = [
  {
    name: "YouTube",
    handle: "Solo Gamingnp",
    href: CHANNEL.url,
    icon: "youtube" as const,
  },
  {
    name: "Discord",
    handle: "Join the gang",
    href: CHANNEL.discord,
    icon: "discord" as const,
  },
  {
    name: "Instagram",
    handle: "@ig_solonp",
    href: CHANNEL.instagram,
    icon: "instagram" as const,
  },
  {
    name: "TikTok",
    handle: "@solo_gamingnp",
    href: CHANNEL.tiktok,
    icon: "tiktok" as const,
  },
  {
    name: "X",
    handle: "@SoloNp007",
    href: CHANNEL.x,
    icon: "x" as const,
  },
];

export type Video = {
  id: string;
  title: string;
  published: string;
  views: number;
  tag: string;
  thumb: string;
};

export function tagForTitle(title: string): string {
  const value = title.toLowerCase();

  if (/fantech|headphone|headset|unbox|gear/.test(value)) return "Gear";
  if (/roblox/.test(value)) return "Roblox";
  if (/smp|minecraft/.test(value)) return "Minecraft";
  if (/gta|roleplay|\brp\b/.test(value)) return "GTA RP";
  if (/pubg|bgmi/.test(value)) return "PUBG Mobile";
  if (/valo|valorant|rank|act|gold|rankup|ome/.test(value)) return "Valorant";

  return "Gang stream";
}

const RAW_VIDEOS = [
  {
    id: "elEw3rOCbps",
    title: "RANK UP HANNAI PARNE HUNXA GANG",
    published: "2026-11-05T13:47:38+00:00",
    views: 40,
  },
  {
    id: "aBgg99oKq0s",
    title: "BATTI GAYO VNYE KANDO HANDINXU",
    published: "2026-11-04T20:21:41+00:00",
    views: 185,
  },
  {
    id: "dUMRyFRqGBk",
    title: "K hudai xa aja voli NEPAL ma ????",
    published: "2026-11-03T20:37:07+00:00",
    views: 113,
  },
  {
    id: "TGBAw9-uoDo",
    title: "AJA GOLD 3 PUGINXA TA GANG !!! RANKUP GAME",
    published: "2026-11-01T20:44:03+00:00",
    views: 227,
  },
  {
    id: "8rQB2XtiqY0",
    title: "Aja k garne hola ta GANG !!! OME & Valo ???",
    published: "2026-10-31T20:46:52+00:00",
    views: 151,
  },
  {
    id: "yhulwWN5rac",
    title: "ROBLOX AND VALORANT WITH THE GANG",
    published: "2026-10-31T00:56:03+00:00",
    views: 179,
  },
  {
    id: "JAtqIx0R3Q8",
    title: "FANTECH TAMAGO II WHG04 is here finally",
    published: "2026-10-29T23:32:51+00:00",
    views: 357,
  },
  {
    id: "3O4IdxIEG_E",
    title: "AJA KADA PUSH HANNE HO",
    published: "2026-10-15T18:15:17+00:00",
    views: 178,
  },
  {
    id: "kHVnlURPeSQ",
    title: "NEW ACT !!! NEW RANK !!! NEW ME",
    published: "2026-10-14T18:23:17+00:00",
    views: 179,
  },
  {
    id: "vvyNyb6Zf7c",
    title: "NEW SMP OR WOT GANG ????",
    published: "2026-10-13T18:27:18+00:00",
    views: 237,
  },
  {
    id: "kmge-vrYwPs",
    title: "GOLD 3 HANNAI PARNE HUNXA !!! ACT IS ENDING",
    published: "2026-10-12T17:45:24+00:00",
    views: 154,
  },
  {
    id: "nmRYtTIY_8M",
    title: "The ACT is ending Soon !!! Ranked Gameplay",
    published: "2026-10-12T03:23:26+00:00",
    views: 94,
  },
  {
    id: "xSkewNhzDlg",
    title: "Batti kI MKC puja karenge",
    published: "2026-10-11T19:19:04+00:00",
    views: 175,
  },
  {
    id: "kzdPM1tesLE",
    title: "NEW DAY NEW MATCH NEW GRIND",
    published: "2026-10-09T18:31:12+00:00",
    views: 190,
  },
  {
    id: "UOSDi3bnnsA",
    title: "GOLD 3 here we come !! Rank Up Only",
    published: "2026-10-07T19:23:49+00:00",
    views: 363,
  },
];

export const FALLBACK_VIDEOS: Video[] = RAW_VIDEOS.map((video) => ({
  ...video,
  tag: tagForTitle(video.title),
  thumb: `/assets/videos/${video.id}.jpg`,
}));

export const LOCAL_THUMBS = new Set(FALLBACK_VIDEOS.map((video) => video.id));

export const formatViews = (views: number) =>
  views > 0
    ? `${new Intl.NumberFormat("en-US", {
        notation: "compact",
        maximumFractionDigits: 1,
      }).format(views)} views`
    : "Just dropped";

export const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "Asia/Kathmandu",
  }).format(new Date(iso));
