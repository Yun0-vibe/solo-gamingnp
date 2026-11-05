import type { Metadata, Viewport } from "next";
import { Anton, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CHANNEL, SITE_URL, SOCIALS } from "@/lib/channel";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Solo Gamingnp — Nepali Gaming, Rank Pushes & Gang Energy",
    template: "%s — Solo Gamingnp",
  },
  description: CHANNEL.description,
  keywords: [
    "Solo Gamingnp",
    "Nepali gaming",
    "Nepal YouTuber",
    "Valorant Nepal",
    "PUBG Nepal",
    "Roblox Nepali",
    "GTA RP Nepali",
    "gaming channel Nepal",
  ],
  authors: [{ name: CHANNEL.name, url: CHANNEL.url }],
  creator: CHANNEL.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: CHANNEL.name,
    title: "Solo Gamingnp — Nepali Gaming, Rank Pushes & Gang Energy",
    description: CHANNEL.description,
    images: [
      {
        url: "/assets/banner.jpg",
        alt: "Solo Gamingnp channel art",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Solo Gamingnp — Nepali Gaming, Rank Pushes & Gang Energy",
    description: CHANNEL.description,
    images: ["/assets/banner.jpg"],
    creator: "@SoloNp007",
  },
  icons: {
    icon: "/assets/avatar.jpg",
    apple: "/assets/avatar.jpg",
  },
};

export const viewport: Viewport = {
  themeColor: "#050506",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: CHANNEL.name,
      url: CHANNEL.url,
      image: `${SITE_URL}/assets/avatar.jpg`,
      description: CHANNEL.description,
      sameAs: SOCIALS.filter((social) => social.name !== "Discord").map(
        (social) => social.href,
      ),
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: CHANNEL.name,
      url: SITE_URL,
      inLanguage: "en",
      about: { "@id": `${SITE_URL}/#person` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${anton.variable} ${grotesk.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-brand focus:px-5 focus:py-3 focus:text-sm focus:font-bold focus:text-white"
        >
          Skip to content
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
