const ITEMS = [
  "Valorant",
  "Roblox",
  "Minecraft SMP",
  "GTA V RP",
  "PUBG Mobile",
  "Ranked grind",
];

function Group({ hidden = false }: { hidden?: boolean }) {
  return (
    <div
      className="flex shrink-0 items-center gap-7 pr-7"
      aria-hidden={hidden || undefined}
    >
      {[...ITEMS, ...ITEMS].map((item, index) => (
        <span
          key={`${item}-${index}`}
          className="flex items-center gap-7 whitespace-nowrap"
        >
          <span className="font-display text-xl uppercase tracking-wider text-ink sm:text-2xl">
            {item}
          </span>
          <span className="text-ink/35" aria-hidden="true">
            ✦
          </span>
        </span>
      ))}
    </div>
  );
}

export function Marquee() {
  return (
    <div className="relative overflow-hidden border-y border-brand-deep bg-brand py-3">
      <div className="flex w-max animate-marquee">
        <Group />
        <Group hidden />
      </div>
      <span className="sr-only">
        Games on the channel: {ITEMS.join(", ")}.
      </span>
    </div>
  );
}
