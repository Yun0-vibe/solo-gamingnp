import Image from "next/image";
import Link from "next/link";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-3" aria-label="Solo Gamingnp home">
      <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-white/25 ring-2 ring-brand/60 transition group-hover:ring-brand">
        <Image
          src="/assets/avatar.jpg"
          alt="Solo Gamingnp"
          fill
          sizes="40px"
          className="object-cover"
        />
      </span>
      {!compact && (
        <span className="leading-none">
          <span className="block font-display text-lg uppercase tracking-wide text-cream">
            Solo Gamingnp
          </span>
          <span className="mt-1 block text-[9px] font-bold uppercase tracking-[0.28em] text-white/40">
            Nepali gaming
          </span>
        </span>
      )}
    </Link>
  );
}
