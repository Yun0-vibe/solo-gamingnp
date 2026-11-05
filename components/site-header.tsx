"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { CHANNEL, SOCIALS } from "@/lib/channel";
import { Logo } from "./logo";
import { SocialIcon } from "./social-icon";
import { LiveBadge } from "./live-badge";

const NAV = [
  { label: "Home", href: "/" },
  { label: "Live", href: "/live" },
  { label: "Videos", href: "/videos" },
  { label: "About", href: "/#about" },
  { label: "Routine", href: "/#routine" },
  { label: "Community", href: "/#community" },
  { label: "Support", href: "/#support" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = scrolled || pathname !== "/";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid
          ? "border-b border-line bg-ink/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-5 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {NAV.map((item) => {
            const active =
              (item.href === "/videos" && pathname.startsWith("/videos")) ||
              (item.href === "/live" && pathname.startsWith("/live"));
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`group inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-[13px] font-medium transition ${
                  active
                    ? "text-brand"
                    : "text-white/65 hover:bg-white/5 hover:text-cream"
                }`}
              >
                {item.label === "Live" && (
                  <span className="h-1.5 w-1.5 rounded-full bg-brand shadow-[0_0_10px_rgba(255,35,56,0.8)]" />
                )}
                {active ? item.label : <span className="link-underline">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <LiveBadge className="hidden xl:inline-flex" />
          <Link
            href={CHANNEL.url}
            target="_blank"
            rel="noreferrer"
            className="group hidden items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-[13px] font-bold uppercase tracking-wide text-white transition hover:bg-brand-soft sm:flex"
          >
            Subscribe
            <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-panel text-cream transition hover:border-brand/60 lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className="fixed inset-x-0 top-20 bottom-0 z-40 overflow-y-auto border-t border-line bg-ink/95 px-5 py-8 backdrop-blur-xl lg:hidden"
        >
          <nav className="flex flex-col" aria-label="Mobile">
            {NAV.map((item, index) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="group flex items-center justify-between border-b border-line/70 py-4"
              >
                <span className="flex items-baseline gap-3">
                  <span className="font-mono text-[10px] text-brand">
                    0{index + 1}
                  </span>
                  <span className="font-display text-2xl uppercase text-cream group-hover:text-brand-soft">
                    {item.label}
                  </span>
                </span>
                <ArrowUpRight className="h-5 w-5 text-white/30 group-hover:text-brand" />
              </Link>
            ))}
          </nav>

          <Link
            href={CHANNEL.url}
            target="_blank"
            rel="noreferrer"
            className="mt-8 flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-4 text-sm font-bold uppercase tracking-wide text-white"
          >
            Subscribe on YouTube
            <ArrowUpRight className="h-4 w-4" />
          </Link>

          <div className="mt-8 flex items-center justify-center gap-3">
            {SOCIALS.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.name}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-panel text-white/60 transition hover:border-brand/60 hover:text-brand"
              >
                <SocialIcon name={social.icon} className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      )}

      <div
        aria-hidden="true"
        className="scroll-progress absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-brand-deep via-brand to-brand-soft"
      />
    </header>
  );
}
