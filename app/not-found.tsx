import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <main
      id="main"
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-5 py-32 text-center"
    >
      <div aria-hidden="true" className="absolute inset-0 grid-lines opacity-30" />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/15 blur-[120px]"
      />
      <div className="relative">
        <p className="font-display text-[clamp(6rem,22vw,14rem)] uppercase leading-none text-brand">
          404
        </p>
        <h1 className="mt-2 font-display text-3xl uppercase text-cream sm:text-4xl">
          This lobby doesn&apos;t exist
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/50">
          Wrong spawn point, gang. The page you&apos;re looking for got rotated
          out — head back to base and pick a new drop.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-brand-soft"
          >
            <Home className="h-4 w-4" />
            Back home
          </Link>
          <Link
            href="/videos"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-cream transition hover:border-brand hover:text-brand"
          >
            <ArrowLeft className="h-4 w-4" />
            Watch videos
          </Link>
        </div>
      </div>
    </main>
  );
}
