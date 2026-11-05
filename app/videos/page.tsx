import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CHANNEL } from "@/lib/channel";
import { getVideos } from "@/lib/youtube";
import { Eyebrow } from "@/components/eyebrow";
import { VideoGrid } from "@/components/video-grid";
import { SocialIcon } from "@/components/social-icon";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "Videos",
  description:
    "Every recent Solo Gamingnp upload in one place — Valorant rank pushes, Roblox and Minecraft nights, gear drops and full-gang chaos from Nepal.",
};

export default async function VideosPage() {
  const videos = await getVideos();

  return (
    <main id="main" className="pb-24">
      <section className="relative overflow-hidden border-b border-line pb-14 pt-32 sm:pt-36">
        <div aria-hidden="true" className="absolute inset-0 grid-lines opacity-30" />
        <div
          aria-hidden="true"
          className="absolute -right-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(closest-side,rgba(255,35,56,0.16),transparent)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent"
        />

        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <Eyebrow>Video archive</Eyebrow>
          <h1 className="mt-4 font-display text-5xl uppercase leading-[0.88] text-cream sm:text-6xl lg:text-7xl">
            Every upload.
            <span className="block text-brand">One place.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/55 sm:text-base">
            The newest drops straight from the YouTube feed — rank pushes, gang
            nights, gear reviews and whatever chaos made the cut.
          </p>

          <div className="mt-7 flex flex-wrap gap-2.5">
            {[
              "Auto-synced with YouTube",
              `${videos.length} recent uploads`,
              "Search · filter · sort",
            ].map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-line bg-panel px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white/50"
              >
                {chip}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={CHANNEL.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-brand-soft"
            >
              <SocialIcon name="youtube" className="h-4 w-4" />
              Subscribe
            </a>
            <a
              href={CHANNEL.discord}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-cream transition hover:border-brand hover:text-brand"
            >
              <SocialIcon name="discord" className="h-4 w-4" />
              Join the Discord
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-14">
        <VideoGrid videos={videos} />

        <div className="mt-10 flex flex-col gap-4 rounded-2xl border border-line bg-panel p-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-sm leading-relaxed text-white/50">
            This page mirrors the channel&apos;s newest uploads automatically.
            For the deep archive and community posts, head to YouTube.
          </p>
          <Link
            href={CHANNEL.url}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-line bg-ink px-5 py-3 text-xs font-bold uppercase tracking-wide text-white/70 transition hover:border-brand hover:text-brand"
          >
            Open YouTube channel
            <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </section>
    </main>
  );
}
