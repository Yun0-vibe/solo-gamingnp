import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  MessageSquare,
  Play,
  Radio,
  Youtube,
} from "lucide-react";
import { CHANNEL, formatDate } from "@/lib/channel";
import { getLiveVideoId, getVideos } from "@/lib/youtube";
import { Eyebrow } from "@/components/eyebrow";
import { LiveBadge } from "@/components/live-badge";
import { LiveChat } from "@/components/live-chat";
import { SocialIcon } from "@/components/social-icon";

export const revalidate = 30;

export const metadata: Metadata = {
  title: "Live",
  description:
    "Watch Solo Gamingnp live from Nepal and chat with the gang in real time — YouTube live player and live chat in one place.",
};

export default async function LivePage() {
  const [liveId, videos] = await Promise.all([getLiveVideoId(), getVideos()]);
  const latest = videos[0];

  return (
    <main id="main" className="relative overflow-hidden pb-24 pt-28 sm:pt-32">
      <div aria-hidden="true" className="absolute inset-0 grid-lines opacity-25" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-0 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(closest-side,rgba(255,35,56,0.16),transparent)]"
      />

      <div className="relative mx-auto max-w-[1500px] px-5 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>Live from Nepal</Eyebrow>
            <h1 className="mt-4 font-display text-5xl uppercase leading-[0.9] text-cream sm:text-6xl lg:text-7xl">
              The stream <span className="text-brand">room.</span>
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/50 sm:text-base">
              Watch the stream and chat with the gang without leaving the site.
              The chat runs on YouTube, so sign in to join the conversation.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <LiveBadge />
            <a
              href={CHANNEL.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-brand-soft"
            >
              <Youtube className="h-4 w-4" />
              Subscribe
            </a>
            <a
              href={CHANNEL.discord}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-xs font-bold uppercase tracking-wide text-cream transition hover:border-brand hover:text-brand"
            >
              <SocialIcon name="discord" className="h-4 w-4" />
              Discord
            </a>
          </div>
        </div>

        {liveId ? (
          <div className="mt-8 grid gap-4 xl:grid-cols-[minmax(0,1fr)_390px]">
            <div className="relative aspect-video overflow-hidden rounded-xl border border-line bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${liveId}?autoplay=1&rel=0`}
                title="Solo Gamingnp live stream"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            </div>

            <div className="flex h-[560px] flex-col overflow-hidden rounded-xl border border-line bg-panel xl:h-auto">
              <div className="flex items-center justify-between border-b border-line px-4 py-3">
                <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-brand">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-brand opacity-40" />
                    <span className="relative inline-flex h-1.5 w-1.5 animate-pulse-dot rounded-full bg-brand" />
                  </span>
                  Live chat
                </span>
                <a
                  href={`https://www.youtube.com/watch?v=${liveId}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/40 transition hover:text-brand"
                >
                  YouTube
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
              <div className="min-h-0 flex-1">
                <LiveChat videoId={liveId} />
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-8 overflow-hidden rounded-2xl border border-line bg-panel">
            <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
              {latest && (
                <a
                  href={`https://www.youtube.com/watch?v=${latest.id}`}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative block aspect-video overflow-hidden bg-black"
                >
                  <Image
                    src={latest.thumb}
                    alt=""
                    fill
                    priority
                    sizes="(min-width: 1024px) 52vw, 100vw"
                    className="object-cover opacity-90 transition duration-500 group-hover:scale-[1.03] group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand text-white shadow-lg shadow-brand/40 transition duration-300 group-hover:scale-110">
                      <Play className="h-6 w-6 translate-x-0.5 fill-current" />
                    </span>
                  </span>
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-soft">
                      Latest upload
                    </p>
                    <p className="mt-1 line-clamp-2 font-display text-xl uppercase leading-tight text-cream">
                      {latest.title}
                    </p>
                  </div>
                </a>
              )}

              <div className="flex flex-col justify-center p-7 sm:p-10">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-line bg-ink text-white/40">
                  <Radio className="h-5 w-5" />
                </span>
                <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.22em] text-white/35">
                  Stream offline
                </p>
                <h2 className="mt-2 font-display text-3xl uppercase leading-none text-cream sm:text-4xl">
                  Solo isn&apos;t live right now
                </h2>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-white/50">
                  New streams usually start most nights around 8 PM NPT. Hit
                  subscribe and the bell so you don&apos;t miss the next one —
                  or hang out in the Discord until then.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={CHANNEL.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-brand-soft"
                  >
                    <Youtube className="h-4 w-4" />
                    Subscribe
                  </a>
                  <a
                    href={CHANNEL.discord}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-xs font-bold uppercase tracking-wide text-white/70 transition hover:border-brand hover:text-brand"
                  >
                    <SocialIcon name="discord" className="h-4 w-4" />
                    Join the Discord
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-line bg-panel p-6">
            <MessageSquare className="h-5 w-5 text-brand" />
            <h2 className="mt-4 font-display text-xl uppercase text-cream">
              Chat needs a YouTube login
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-white/45">
              The embedded chat is the official YouTube chat. Sign in to your
              Google account to send messages — reading is open to everyone.
            </p>
          </div>
          <div className="rounded-2xl border border-line bg-panel p-6">
            <Radio className="h-5 w-5 text-brand" />
            <h2 className="mt-4 font-display text-xl uppercase text-cream">
              Auto-live detection
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-white/45">
              This page checks the channel every 30 seconds and automatically
              switches between live and offline.
            </p>
          </div>
          <div className="rounded-2xl border border-line bg-panel p-6">
            <Youtube className="h-5 w-5 text-brand" />
            <h2 className="mt-4 font-display text-xl uppercase text-cream">
              {latest ? `Latest: ${formatDate(latest.published)}` : "Newest uploads"}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-white/45">
              Missed the stream? Every session lands in the video archive with
              the rest of the grind.
            </p>
            <Link
              href="/videos"
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-brand-soft transition hover:text-brand"
            >
              Browse videos
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
