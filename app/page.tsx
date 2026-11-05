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
import { CountUp } from "@/components/count-up";
import { LiveBadge } from "@/components/live-badge";
import { Reveal } from "@/components/reveal";
import { Faq } from "@/components/faq";

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

const GAME_ORDER = [
  "Valorant",
  "Roblox",
  "Minecraft",
  "GTA RP",
  "Gear",
  "PUBG Mobile",
  "Gang stream",
];

export default async function HomePage() {
  const videos = await getVideos();
  const featured = videos[0];
  const spotlight = videos[1] ?? videos[0];

  const games = GAME_ORDER.map((tag) => ({
    tag,
    count: videos.filter((video) => video.tag === tag).length,
  }))
    .filter((game) => game.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return (
    <main id="main">
      {/* Hero */}
      <section className="relative isolate overflow-hidden border-b border-line">
        <div className="absolute inset-0 -z-20">
          <Image
            src="/assets/hero.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[68%_center]"
          />
        </div>
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,#050506_0%,rgba(5,5,6,0.94)_36%,rgba(5,5,6,0.6)_66%,rgba(5,5,6,0.25)_100%)]" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/15 to-ink/70" />
        <div className="absolute inset-0 -z-10 grid-lines opacity-25" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 top-1/4 -z-10 h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(closest-side,rgba(255,35,56,0.18),transparent)]"
        />

        <div className="mx-auto max-w-7xl px-5 pb-12 pt-28 sm:pt-32 lg:px-8 lg:pb-14">
          <div className="grid items-center gap-12 lg:grid-cols-[1.06fr_0.94fr] lg:gap-14">
            <div>
              <div className="intro-up intro-1 flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                  Made in Nepal
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                  Est. 2023
                </span>
                <LiveBadge />
              </div>

              <h1 className="intro-up intro-2 mt-6 font-display text-[clamp(3.2rem,8.5vw,6.6rem)] uppercase leading-[0.86] tracking-tight text-cream">
                Namaste,
                <span className="block text-brand">Gang.</span>
              </h1>

              <p className="intro-up intro-3 mt-6 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
                Valorant rank pushes, Roblox detours and full-squad chaos —
                streamed nightly from Nepal. Pull up, the grind doesn&apos;t
                stop.
              </p>

              <div className="intro-up intro-4 mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="#latest"
                  className="group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full bg-brand px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-brand-soft"
                >
                  <span className="shine pointer-events-none absolute inset-0" />
                  <Play className="h-4 w-4 fill-current" />
                  Watch the latest
                </Link>
                <a
                  href={CHANNEL.discord}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-cream transition hover:border-brand hover:text-brand"
                >
                  <SocialIcon name="discord" className="h-4 w-4" />
                  Join the gang
                </a>
                <Link
                  href="/live"
                  className="inline-flex items-center justify-center gap-2 px-2 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-white/45 transition hover:text-brand"
                >
                  Live room
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <dl className="intro-up intro-5 mt-9 grid max-w-lg grid-cols-3 divide-x divide-white/10 border-y border-white/10">
                <div className="py-4 pr-4">
                  <dt className="sr-only">YouTube subscribers</dt>
                  <dd className="font-display text-2xl leading-none text-cream sm:text-3xl">
                    <CountUp value={1.27} decimals={2} suffix="K" />
                  </dd>
                  <p className="mt-2 text-[9px] font-semibold uppercase tracking-[0.16em] text-white/40">
                    YouTube family
                  </p>
                </div>
                <div className="px-4 py-4">
                  <dt className="sr-only">Recent uploads</dt>
                  <dd className="font-display text-2xl leading-none text-cream sm:text-3xl">
                    <CountUp value={videos.length} />
                  </dd>
                  <p className="mt-2 text-[9px] font-semibold uppercase tracking-[0.16em] text-white/40">
                    Recent uploads
                  </p>
                </div>
                <div className="py-4 pl-4">
                  <dt className="sr-only">Channel start year</dt>
                  <dd className="font-display text-2xl leading-none text-cream sm:text-3xl">
                    {CHANNEL.started}
                  </dd>
                  <p className="mt-2 text-[9px] font-semibold uppercase tracking-[0.16em] text-white/40">
                    Grinding since
                  </p>
                </div>
              </dl>
            </div>

            <div className="intro-up intro-6">
              <FeaturedVideo video={featured} />
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/10 pt-5 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/35">
            <span lang="ne">काठमाडौँ · नेपाल</span>
            <span className="hidden h-1 w-1 rounded-full bg-white/20 sm:block" />
            <span>Valorant / Roblox / Minecraft</span>
            <span className="hidden h-1 w-1 rounded-full bg-white/20 sm:block" />
            <span>Streams ~8 PM NPT</span>
            <span className="ml-auto hidden items-center gap-2 text-white/25 lg:flex">
              Scroll to explore
              <span aria-hidden="true">↓</span>
            </span>
          </div>
        </div>
      </section>

      <Marquee />

      {/* Latest videos */}
      <section id="latest" className="border-b border-line py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <Eyebrow index="01">Upload feed</Eyebrow>
                <h2 className="mt-3 font-display text-3xl uppercase leading-[0.95] text-cream sm:text-4xl lg:text-5xl">
                  Latest from <span className="text-brand">the grind</span>
                </h2>
                <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/45">
                  Fresh off the channel, auto-synced with YouTube. Tap any card
                  to watch without leaving the site.
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
          </Reveal>

          <Reveal className="mt-7">
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
              {games.map((game) => (
                <Link
                  key={game.tag}
                  href={`/videos?game=${encodeURIComponent(game.tag)}`}
                  className="group flex items-center justify-between gap-2 rounded-lg border border-line bg-panel px-3.5 py-3 transition hover:border-brand/60 hover:bg-panel-2"
                >
                  <span>
                    <span className="block text-[13px] font-semibold text-cream">
                      {game.tag}
                    </span>
                    <span className="block text-[9px] uppercase tracking-[0.16em] text-white/35">
                      {game.count} {game.count === 1 ? "video" : "videos"}
                    </span>
                  </span>
                  <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-white/25 transition group-hover:text-brand" />
                </Link>
              ))}
            </div>
          </Reveal>

          <Reveal className="mt-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <VideoCard
                video={spotlight}
                spotlight
                className="sm:col-span-2 lg:col-span-2 lg:row-span-2"
              />
              {videos.slice(2, 6).map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* About */}
      <section
        id="about"
        className="border-b border-line bg-ink-2 py-16 lg:py-20"
      >
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
            <Reveal>
              <div className="relative aspect-[16/8] overflow-hidden rounded-xl border border-line">
                <Image
                  src="/assets/banner.jpg"
                  alt="Solo Gamingnp channel banner"
                  fill
                  sizes="(min-width: 1024px) 46vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                  <span className="rounded-full bg-black/75 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-white/70">
                    Nepal
                  </span>
                  <span className="rounded-full bg-black/75 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-white/70">
                    Est. 2023
                  </span>
                  <span className="rounded-full bg-brand px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-white">
                    NPT 8 PM
                  </span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-[auto_1fr] gap-4">
                <div className="relative h-28 w-28 overflow-hidden rounded-lg border border-line">
                  <Image
                    src="/assets/avatar.jpg"
                    alt="Solo Gamingnp portrait"
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                </div>
                <blockquote className="flex flex-col justify-between rounded-lg border border-line bg-panel p-4">
                  <p className="font-display text-base uppercase leading-tight text-cream">
                    &ldquo;Aaja k garne hola ta, gang?&rdquo;
                  </p>
                  <p className="mt-3 text-[9px] font-semibold uppercase tracking-[0.18em] text-white/35">
                    The daily channel dilemma
                  </p>
                </blockquote>
              </div>
            </Reveal>

            <Reveal delay={90}>
              <Eyebrow index="02">The solo story</Eyebrow>
              <h2 className="mt-3 font-display text-3xl uppercase leading-[0.95] text-cream sm:text-4xl lg:text-5xl">
                One solo grind.
                <span className="block text-brand">
                  A whole gang behind it.
                </span>
              </h2>
              <div className="mt-5 space-y-3 text-sm leading-relaxed text-white/55 sm:text-[15px]">
                <p>
                  Solo Gamingnp went live in 2023 with one goal: make daily
                  ranked nights worth showing up for. What started as solo
                  queues turned into a full-on hangout — Valorant climbs,
                  Roblox detours, Minecraft builds and the kind of Nepali banter
                  that makes a lost rank feel funny.
                </p>
                <p>
                  No scripted highlight reels. Just the grind, the gang, and
                  whatever game wins the vote tonight.
                </p>
              </div>

              <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                {[
                  "Valorant Act pushes & rank-up runs",
                  "Roblox, Minecraft SMP & party nights",
                  "GTA RP sessions with the squad",
                  "Fantech gear unboxings & honest takes",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 rounded-lg border border-line/70 bg-panel/60 px-3 py-2.5 text-[13px] text-white/65"
                  >
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand">
                      <Check className="h-2.5 w-2.5" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-line bg-panel px-5 py-4">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-white/35">
                    Gear partners
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-2">
                    <a
                      href={CHANNEL.fantech}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center gap-1.5 font-display text-lg uppercase tracking-wide text-cream transition hover:text-brand"
                    >
                      Fantech Nepal
                      <ArrowUpRight className="h-4 w-4 text-white/30 transition group-hover:text-brand" />
                    </a>
                    <span className="text-xs font-semibold uppercase tracking-[0.16em] text-white/40">
                      Nexvora
                    </span>
                  </div>
                </div>
                <Link
                  href="/videos"
                  className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/45 transition hover:text-brand"
                >
                  Watch the story →
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Routine */}
      <section
        id="routine"
        className="relative border-b border-line py-16 lg:py-20"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-40 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(255,35,56,0.12),transparent)]"
        />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div className="max-w-2xl">
                <Eyebrow index="03">The routine</Eyebrow>
                <h2 className="mt-3 font-display text-3xl uppercase leading-[0.95] text-cream sm:text-4xl lg:text-5xl">
                  When the gang <span className="text-brand">pulls up</span>
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-white/45 sm:text-[15px]">
                  The channel runs on the grind, not a rigid timetable.
                  Here&apos;s the usual rhythm.
                </p>
              </div>
              <p className="max-w-xs text-[10px] leading-relaxed uppercase tracking-[0.16em] text-white/30">
                All times NPT (UTC+5:45) · sessions can shift week to week
              </p>
            </div>
          </Reveal>

          <Reveal className="mt-8">
            <div className="grid gap-4 md:grid-cols-3">
              {ROUTINE.map((item, index) => (
                <div
                  key={item.title}
                  className="group relative overflow-hidden rounded-xl border border-line bg-panel p-6 transition hover:border-brand/50 hover:bg-panel-2"
                >
                  <span className="absolute right-5 top-3 font-display text-5xl text-white/5 transition group-hover:text-brand/15">
                    0{index + 1}
                  </span>
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-brand/25 bg-brand/10 text-brand">
                    <item.icon className="h-4 w-4" />
                  </span>
                  <h3 className="mt-4 font-display text-xl uppercase text-cream">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.18em] text-brand-soft">
                    {item.when}
                  </p>
                  <p className="mt-3 text-[13px] leading-relaxed text-white/50">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Community */}
      <section id="community" className="border-b border-line py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal>
            <div className="relative overflow-hidden rounded-xl border border-line bg-gradient-to-br from-brand/15 via-panel to-panel p-6 sm:p-9 lg:p-12">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[radial-gradient(closest-side,rgba(255,35,56,0.28),transparent)]"
              />
              <div className="relative grid gap-9 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-cream">
                      <SocialIcon name="discord" className="h-5 w-5" />
                    </span>
                    <Eyebrow index="04">The community</Eyebrow>
                  </div>
                  <h2 className="mt-4 font-display text-3xl uppercase leading-[0.95] text-cream sm:text-4xl lg:text-5xl">
                    The gang <span className="text-brand">lives here.</span>
                  </h2>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-white/60 sm:text-[15px]">
                    Clips, squad-finder, game-night votes and pure Nepali gaming
                    banter. If you watch the channel, you belong in the Discord.
                  </p>
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <a
                      href={CHANNEL.discord}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-5 py-3 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-brand-soft"
                    >
                      Join the Discord
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                    <a
                      href={CHANNEL.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-5 py-3 text-xs font-bold uppercase tracking-wide text-cream transition hover:border-brand hover:text-brand"
                    >
                      Subscribe on YouTube
                    </a>
                  </div>
                </div>

                <div className="rounded-lg border border-white/10 bg-ink/60 p-1.5">
                  {SOCIALS.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center justify-between gap-4 rounded-md px-3.5 py-3 transition hover:bg-white/5"
                    >
                      <span className="flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-panel text-white/60 transition group-hover:border-brand/50 group-hover:text-brand">
                          <SocialIcon
                            name={social.icon}
                            className="h-3.5 w-3.5"
                          />
                        </span>
                        <span>
                          <span className="block text-[13px] font-semibold text-cream">
                            {social.name}
                          </span>
                          <span className="block text-[10px] text-white/40">
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
          </Reveal>
        </div>
      </section>

      {/* Support */}
      <section
        id="support"
        className="border-b border-line bg-ink-2 py-16 lg:py-20"
      >
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal>
            <div className="max-w-2xl">
              <Eyebrow index="05">Support</Eyebrow>
              <h2 className="mt-3 font-display text-3xl uppercase leading-[0.95] text-cream sm:text-4xl lg:text-5xl">
                Fuel <span className="text-brand">the grind</span>
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/45 sm:text-[15px]">
                The channel stays free because of the gang. Tips and gear links
                both keep the setup running.
              </p>
            </div>
          </Reveal>

          <Reveal className="mt-8" delay={60}>
            <div className="grid gap-4 lg:grid-cols-2">
              <div className="rounded-xl border border-brand/30 bg-gradient-to-br from-brand/12 via-panel to-panel p-6">
                <div className="flex items-center justify-between">
                  <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-brand-soft">
                    Direct support
                  </p>
                  <Heart className="h-4 w-4 text-brand" />
                </div>
                <h3 className="mt-3 font-display text-2xl uppercase text-cream">
                  Tip the stream
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-white/55">
                  Tips go straight back into the setup, the games and the
                  internet bill. Leave a message with your tip — it gets read
                  out on stream.
                </p>

                <div className="mt-5 flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-ink/70 p-4">
                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/35">
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
                  className="group mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-brand-soft transition hover:text-brand"
                >
                  Send a tip online
                  <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </div>

              <div className="rounded-xl border border-line bg-panel p-6">
                <div className="flex items-center justify-between">
                  <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-white/40">
                    Gear partner
                  </p>
                  <ShieldCheck className="h-4 w-4 text-white/40" />
                </div>
                <h3 className="mt-3 font-display text-2xl uppercase text-cream">
                  Gear up with Fantech
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-white/55">
                  Headphones, keyboards and the rest of the setup come from
                  Fantech Nepal. Use the channel link and the grind gets a cut
                  at no extra cost to you.
                </p>
                <a
                  href={CHANNEL.fantech}
                  target="_blank"
                  rel="noreferrer"
                  className="group mt-5 inline-flex items-center gap-2 rounded-full border border-line bg-ink px-5 py-2.5 text-[11px] font-bold uppercase tracking-wide text-white/70 transition hover:border-brand hover:text-brand"
                >
                  Shop Fantech Nepal
                  <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
                <p className="mt-3 text-[10px] leading-relaxed text-white/30">
                  Affiliate link. It supports the channel at no extra cost.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal className="mt-4" delay={90}>
            <div className="flex flex-col gap-5 rounded-xl bg-brand p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-7">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-white/70">
                  Business &amp; collabs
                </p>
                <h3 className="mt-1.5 font-display text-2xl uppercase leading-none sm:text-3xl">
                  Got a squad, sponsor or story?
                </h3>
              </div>
              <div className="flex flex-wrap gap-2.5">
                <a
                  href={CHANNEL.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-[11px] font-bold uppercase tracking-wide text-cream transition hover:bg-black"
                >
                  <SocialIcon name="instagram" className="h-4 w-4" />
                  Instagram DM
                </a>
                <a
                  href={CHANNEL.discord}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/40 px-4 py-2.5 text-[11px] font-bold uppercase tracking-wide text-white transition hover:bg-white/10"
                >
                  <SocialIcon name="discord" className="h-4 w-4" />
                  Discord
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
            <Reveal>
              <Eyebrow index="06">FAQ</Eyebrow>
              <h2 className="mt-3 font-display text-3xl uppercase leading-[0.95] text-cream sm:text-4xl">
                Before you <span className="text-brand">ask, gang.</span>
              </h2>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/45">
                The quick answers. Everything else lives in the Discord —
                someone is always online.
              </p>
              <a
                href={CHANNEL.discord}
                target="_blank"
                rel="noreferrer"
                className="group mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-brand-soft transition hover:text-brand"
              >
                Ask in the Discord
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </Reveal>

            <Reveal delay={80}>
              <Faq />
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
