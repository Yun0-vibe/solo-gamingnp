import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CHANNEL, SOCIALS } from "@/lib/channel";
import { Logo } from "./logo";
import { SocialIcon } from "./social-icon";

const EXPLORE = [
  { label: "Live stream", href: "/live" },
  { label: "Latest videos", href: "/#latest" },
  { label: "Video archive", href: "/videos" },
  { label: "About Solo", href: "/#about" },
  { label: "Routine", href: "/#routine" },
  { label: "FAQ", href: "/#faq" },
  { label: "Support the grind", href: "/#support" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-ink-2">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr] lg:px-8">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-5 text-sm leading-relaxed text-white/50">
            {CHANNEL.description}
          </p>
          <div className="mt-6 flex gap-2.5">
            {SOCIALS.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.name}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-panel text-white/55 transition hover:border-brand/60 hover:text-brand"
              >
                <SocialIcon name={social.icon} className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-[11px] font-bold uppercase tracking-[0.25em] text-white/40">
            Explore
          </h2>
          <ul className="mt-5 space-y-3">
            {EXPLORE.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="text-sm text-white/60 transition hover:text-brand-soft"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-[11px] font-bold uppercase tracking-[0.25em] text-white/40">
            The gang
          </h2>
          <ul className="mt-5 space-y-3">
            <li>
              <a
                href={CHANNEL.discord}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-1.5 text-sm text-white/60 transition hover:text-brand-soft"
              >
                Join the Discord
                <ArrowUpRight className="h-3.5 w-3.5 opacity-50 transition group-hover:opacity-100" />
              </a>
            </li>
            <li>
              <a
                href={CHANNEL.fantech}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-1.5 text-sm text-white/60 transition hover:text-brand-soft"
              >
                Fantech gear
                <ArrowUpRight className="h-3.5 w-3.5 opacity-50 transition group-hover:opacity-100" />
              </a>
            </li>
            <li>
              <a
                href={CHANNEL.tipUrl}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-1.5 text-sm text-white/60 transition hover:text-brand-soft"
              >
                Tip the stream
                <ArrowUpRight className="h-3.5 w-3.5 opacity-50 transition group-hover:opacity-100" />
              </a>
            </li>
            <li>
              <a
                href={CHANNEL.instagram}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-1.5 text-sm text-white/60 transition hover:text-brand-soft"
              >
                Business &amp; collabs
                <ArrowUpRight className="h-3.5 w-3.5 opacity-50 transition group-hover:opacity-100" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-6 text-[11px] text-white/35 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>© {new Date().getFullYear()} Solo Gamingnp. All rights reserved.</p>
          <p>
            Independent creator site. Game titles and logos belong to their
            respective owners.
          </p>
        </div>
      </div>
    </footer>
  );
}
