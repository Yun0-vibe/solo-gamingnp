import { Plus } from "lucide-react";

const FAQ = [
  {
    q: "When does Solo Gamingnp go live?",
    a: "Most nights around 8 PM NPT (UTC+5:45), with longer weekend sessions. The schedule is loose on purpose — the Discord always has the exact time before a stream starts.",
  },
  {
    q: "Which games does the channel play?",
    a: "Valorant ranked pushes are the main event, plus Roblox, Minecraft SMP, GTA RP, PUBG Mobile and whatever the gang votes for on a given night.",
  },
  {
    q: "Can I play with the gang?",
    a: "Yes. Squad slots are announced in the Discord before each session. Join, say namaste and keep an eye on the squad-finder channel.",
  },
  {
    q: "Do I need a YouTube account to use live chat?",
    a: "You can read the chat without signing in. To send messages you need to be logged into a Google account, because the chat is the official YouTube one — there is no separate login.",
  },
  {
    q: "How do tips work?",
    a: "Tips go through eSewa or Khalti to the number on the support section, or online via the tip link. Every rupee goes back into the setup, the games and the internet bill, and messages get read out on stream.",
  },
  {
    q: "Is this the official website?",
    a: "It is an independent creator site for the Solo Gamingnp channel. Video data and live status sync from YouTube automatically — for the full archive, head to the channel.",
  },
];

export function Faq() {
  return (
    <div className="divide-y divide-line border-y border-line">
      {FAQ.map((item) => (
        <details key={item.q} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left [&::-webkit-details-marker]:hidden">
            <span className="text-[15px] font-semibold text-cream transition group-hover:text-brand-soft sm:text-base">
              {item.q}
            </span>
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line text-white/45 transition group-open:rotate-45 group-open:border-brand/50 group-open:text-brand">
              <Plus className="h-4 w-4" />
            </span>
          </summary>
          <p className="max-w-2xl pb-6 pr-10 text-sm leading-relaxed text-white/50">
            {item.a}
          </p>
        </details>
      ))}
    </div>
  );
}
