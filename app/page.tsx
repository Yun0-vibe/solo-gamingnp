import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Crosshair,
  Gamepad2,
  Headphones,
  Heart,
  Play,
  ShieldCheck,
} from "lucide-react";
import { CHANNEL, SOCIALS } from "@/lib/channel";
import { getVideos } from "@/lib/youtube";
import { FeaturedVideo } from "@/components/featured-video";
import { Marquee } from "@/components/marquee";
import { VideoCard } from "@/components/video-card";
import { Eyebrow } from "@/components/eyebrow";
import { CopyButton } from "@/components/copy-button";
import { SocialIcon } from "@/components/social-icon";

export const revalidate = 1800;

const ROUTINE = [
  {
    icon: Crosshair,
    title: "Ranked grind",
    when: "Most nights · ~8 PM NPT",
    text: "Valorant queues, Act resets and the long climb out of Gold. This is the main event.",
  },
  {
    icon: Gamepad2,
    title: "Gang nights",
    when: "Weekends",
    text: "Roblox, Minecraft SMP and party games — whatever the squad votes for that night.",
  },
  {
    icon: Headphones,
    title: "Gear drops",
    when: "When it lands",
    text: "Unboxings and no-nonsense takes on the gear actually used for the grind.",
  },
];

export default async function HomePage() {
  const videos = await getVideos();
  const featured = videos[0];

  return (
    <main id="main">
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-20">
          <Image
            src="/assets/hero.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[68%_center]"
          />
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/85 to-ink/25" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-transparent to-ink/70" />
        <div className="absolute inset-0 -z-10 grid-lines opacity-40" />
        <div className="absolute inset-0 -z-10 grain" />

        <div className="mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-5 pb-20 pt-32 lg:px-8 lg:pb-24">
          <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div>
              <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-white/70">
                  Live from Nepal · Est. 2023
                </span>
              </div>

              <h1 className="mt-6 font-display text-[clamp(3.6rem,10vw,7.8rem)] uppercase leading-[0.86] tracking-tight text-cream">
                Namaste,
                <span className="block text-brand drop-shadow-[0_0_45px_rgba(255,35,56,0.35)]">
                  Gang.
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
                Valorant rank pushes, Roblox nights and full-squad chaos —
                daily gaming from Nepal. Pull up, the grind doesn&apos;t stop.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="#latest"
                  className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-brand px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-brand-soft"
                >
                  <Play className="h-4 w-4 fill-current" />
                  Watch the latest
                </Link>
                <a
                  href={CHANNEL.discord}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center justify-center gap-2.5 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-cream backdrop-blur transition hover:border-brand hover:text-brand"
                >
                  <SocialIcon name="discord" className="h-4 w-4" />
                  Join the gang
                </a>
              </div>

              <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-white/10 pt-6">
                <div>
                  <dt className="sr-only">YouTube subscribers</dt>
                  <dd className="font-display text-3xl leading-none text-cream">
                    {CHANNEL.subscribers}
                  </dd>
                  <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/40">
                    YouTube family
                  </p>
                </div>
                <div>
                  <dt className="sr-only">Recent uploads</dt>
                  <dd className="font-display text-3xl leading-none text-cream">
                    {videos.length}
                  </dd>
                  <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/40">
                    Recent uploads
                  </p>
                </div>
                <div>
                  <dt className="sr-only">Channel start year</dt>
                  <dd className="font-display text-3xl leading-none text-cream">
                    {CHANNEL.started}
                  </dd>
                  <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/40">
                    Grinding since
                  </p>
                </div>
              </dl>
            </div>

            <FeaturedVideo video={featured} />
          </div>
        </div>
      </section>

      <Marquee />

      {/* Latest videos */}
      <section id="latest" className="relative py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow>The upload feed</Eyebrow>
              <h2 className="mt-4 font-display text-4xl uppercase leading-[0.92] text-cream sm:text-5xl lg:text-6xl">
                Latest from <span className="text-brand">the grind</span>
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/50">
                Fresh off the channel — tap any card to watch right here.
                Auto-synced with YouTube.
              </p>
            </div>
            <Link
              href="/videos"
              className="group inline-flex items-center gap-2 rounded-full border border-line bg-panel px-5 py-3 text-xs font-bold uppercase tracking-wide text-white/70 transition hover:border-brand hover:text-brand"
            >
              All videos
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {videos.slice(0, 6).map((video, index) => (
              <VideoCard
                key={video.id}
                video={video}
                priority={index < 3}
              />
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section
        id="about"
        className="relative border-t border-line bg-ink-2 py-24 lg:py-28"
      >
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
            <div>
              <div className="relative aspect-[16/7] overflow-hidden rounded-2xl border border-line">
                <Image
                  src="/assets/banner.jpg"
                  alt="Solo Gamingnp channel banner"
                  fill
                  sizes="(min-width: 1024px) 46vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
                <span className="absolute bottom-4 left-4 rounded-full border border-white/15 bg-black/50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/70 backdrop-blur">
                  Nepal · Est. 2023
                </span>
              </div>

              <div className="mt-5 grid grid-cols-[auto_1fr] gap-4">
                <div className="relative h-32 w-32 overflow-hidden rounded-xl border border-white/15">
                  <Image
                    src="/assets/avatar.jpg"
                    alt="Solo Gamingnp portrait"
                    fill
                    sizes="128px"
                    className="object-cover"
                  />
                </div>
                <blockquote className="flex flex-col justify-between rounded-xl border border-line bg-panel p-4">
                  <p className="font-display text-lg uppercase leading-tight text-cream">
                    &ldquo;Aaja k garne hola ta, gang?&rdquo;
                  </p>
                  <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35">
                    The daily channel dilemma
                  </p>
                </blockquote>
              </div>
            </div>

            <div>
              <Eyebrow>The solo story</Eyebrow>
              <h2 className="mt-4 font-display text-4xl uppercase leading-[0.92] text-cream sm:text-5xl lg:text-6xl">
                One solo grind.
                <span className="block text-brand">A whole gang behind it.</span>
              </h2>
              <div className="mt-6 space-y-4 text-sm leading-relaxed text-white/55 sm:text-base">
                <p>
                  Solo Gamingnp went live in 2023 with one goal: make daily
                  ranked nights worth showing up for. What started as solo
                  queues turned into a full-on hangout — Valorant climbs,
                  Roblox detours, Minecraft builds and the kind of Nepali
                  banter that makes a lost rank feel funny.
                </p>
                <p>
                  No scripted highlight reels. Just the grind, the gang, and
                  whatever game wins the vote tonight.
                </p>
              </div>

              <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                {[
                  "Valorant Act pushes & rank-up runs",
                  "Roblox, Minecraft SMP & party nights",
                  "GTA RP sessions with the squad",
                  "Fantech gear unboxings & honest takes",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm text-white/65"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand">
                      <Check className="h-3 w-3" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-8 rounded-xl border border-line bg-panel/70 p-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/35">
                  Gear partners
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2">
                  <a
                    href={CHANNEL.fantech}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-2 font-display text-xl uppercase tracking-wide text-cream transition hover:text-brand"
                  >
                    Fantech Nepal
                    <ArrowUpRight className="h-4 w-4 text-white/30 transition group-hover:text-brand" />
                  </a>
                  <span className="text-sm font-semibold uppercase tracking-[0.16em] text-white/40">
                    Nexvora
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Routine */}
      <section id="routine" className="relative overflow-hidden border-t border-line py-24 lg:py-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-40 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-brand/10 blur-[120px]"
        />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <div className="max-w-2xl">
            <Eyebrow>The routine</Eyebrow>
            <h2 className="mt-4 font-display text-4xl uppercase leading-[0.92] text-cream sm:text-5xl lg:text-6xl">
              When the gang <span className="text-brand">pulls up</span>
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/50 sm:text-base">
              The channel runs on the grind, not a rigid timetable. Here&apos;s
              the usual rhythm.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {ROUTINE.map((item, index) => (
              <div
                key={item.title}
                className="group relative overflow-hidden rounded-2xl border border-line bg-panel p-7 transition hover:border-brand/50 hover:bg-panel-2"
              >
                <span className="absolute right-5 top-4 font-display text-5xl text-white/5 transition group-hover:text-brand/15">
                  0{index + 1}
                </span>
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-brand/25 bg-brand/10 text-brand">
                  <item.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-display text-2xl uppercase text-cream">
                  {item.title}
                </h3>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-brand-soft">
                  {item.when}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-white/50">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-6 text-xs text-white/35">
            All times NPT (UTC+5:45). Sessions can shift week to week — the
            Discord is the first place updates land.
          </p>
        </div>
      </section>

      {/* Community */}
      <section id="community" className="border-t border-line py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-brand/25 bg-gradient-to-br from-brand/20 via-panel to-panel p-7 sm:p-10 lg:p-14">
            <div
              aria-hidden="true"
              className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-brand/25 blur-[110px]"
            />
            <div className="relative grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
              <div>
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-cream">
                  <SocialIcon name="discord" className="h-5 w-5" />
                </span>
                <h2 className="mt-5 font-display text-4xl uppercase leading-[0.92] text-cream sm:text-5xl">
                  The gang <span className="text-brand">lives here.</span>
                </h2>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-white/60 sm:text-base">
                  Clips, squad-finder, game-night votes and pure Nepali gaming
                  banter. If you watch the channel, you belong in the Discord.
                </p>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={CHANNEL.discord}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-brand-soft"
                  >
                    Join the Discord
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                  <a
                    href={CHANNEL.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-cream transition hover:border-brand hover:text-brand"
                  >
                    Subscribe on YouTube
                  </a>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-ink/50 p-2 backdrop-blur">
                {SOCIALS.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center justify-between gap-4 rounded-xl px-4 py-3.5 transition hover:bg-white/5"
                  >
                    <span className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-panel text-white/60 transition group-hover:border-brand/50 group-hover:text-brand">
                        <SocialIcon name={social.icon} className="h-4 w-4" />
                      </span>
                      <span>
                        <span className="block text-sm font-semibold text-cream">
                          {social.name}
                        </span>
                        <span className="block text-[11px] text-white/40">
                          {social.handle}
                        </span>
                      </span>
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-white/25 transition group-hover:text-brand" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support */}
      <section id="support" className="border-t border-line bg-ink-2 py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="max-w-2xl">
            <Eyebrow>Support</Eyebrow>
            <h2 className="mt-4 font-display text-4xl uppercase leading-[0.92] text-cream sm:text-5xl lg:text-6xl">
              Fuel <span className="text-brand">the grind</span>
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/50 sm:text-base">
              The channel stays free because of the gang. Here&apos;s how you
              can back it without spending a rupee.
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            <div className="rounded-2xl border border-brand/30 bg-gradient-to-br from-brand/15 via-panel to-panel p-7">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-soft">
                  Direct support
                </p>
                <Heart className="h-5 w-5 text-brand" />
              </div>
              <h3 className="mt-4 font-display text-3xl uppercase text-cream">
                Tip the stream
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/55">
                Tips go straight back into the setup, the games and the
                internet bill. Leave a message with your tip — it gets read out
                on stream.
              </p>

              <div className="mt-6 flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-ink/60 p-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35">
                    eSewa · Khalti
                  </p>
                  <p className="mt-1 font-mono text-lg tracking-wide text-cream">
                    {CHANNEL.tipNumber}
                  </p>
                </div>
                <CopyButton value={CHANNEL.tipNumber} />
              </div>

              <a
                href={CHANNEL.tipUrl}
                target="_blank"
                rel="noreferrer"
                className="group mt-5 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-brand-soft transition hover:text-brand"
              >
                Send a tip online
                <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>

            <div className="rounded-2xl border border-line bg-panel p-7">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/40">
                  Gear partner
                </p>
                <ShieldCheck className="h-5 w-5 text-white/40" />
              </div>
              <h3 className="mt-4 font-display text-3xl uppercase text-cream">
                Gear up with Fantech
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/55">
                Headphones, keyboards and the rest of the setup come from
                Fantech Nepal. Use the channel link and the grind gets a cut at
                no extra cost to you.
              </p>
              <a
                href={CHANNEL.fantech}
                target="_blank"
                rel="noreferrer"
                className="group mt-6 inline-flex items-center gap-2 rounded-full border border-line bg-ink px-5 py-3 text-xs font-bold uppercase tracking-wide text-white/70 transition hover:border-brand hover:text-brand"
              >
                Shop Fantech Nepal
                <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <p className="mt-4 text-[11px] leading-relaxed text-white/30">
                Affiliate link. It supports the channel at no extra cost.
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-5 rounded-2xl bg-brand p-7 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/70">
                Business &amp; collabs
              </p>
              <h3 className="mt-2 font-display text-3xl uppercase leading-none sm:text-4xl">
                Got a squad, sponsor or story?
              </h3>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={CHANNEL.instagram}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-xs font-bold uppercase tracking-wide text-cream transition hover:bg-black"
              >
                <SocialIcon name="instagram" className="h-4 w-4" />
                Instagram DM
              </a>
              <a
                href={CHANNEL.discord}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/40 px-5 py-3 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-white/10"
              >
                <SocialIcon name="discord" className="h-4 w-4" />
                Discord
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
