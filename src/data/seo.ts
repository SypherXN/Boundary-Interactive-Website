import { images } from "./images";
import { game, teamMembers } from "./site";

/** Dedicated 1200×630 social preview (see /public/og-social.png). */
export const socialOgImage = {
  path: "/og-social.png",
  width: 1200,
  height: 630,
  alt: "Fly Exterminator mixed-reality game for Meta Quest 3 by Boundary Interactive"
} as const;

export const ogImages = {
  default: socialOgImage,
  game: {
    path: images.heroArt.src,
    width: images.heroArt.width,
    height: images.heroArt.height,
    alt: "Fly Exterminator key art — mixed-reality fly-catching on Meta Quest 3"
  },
  press: {
    path: images.coverWide.src,
    width: images.coverWide.width,
    height: images.coverWide.height,
    alt: "Fly Exterminator wide cover art for press and social sharing"
  }
} as const;

/** Per-page `<title>` and meta descriptions (~150–160 chars). */
export const pageSeo = {
  home: {
    title: "Boundary Interactive | Mixed-Reality Indie Game Studio for Meta Quest",
    description:
      "Boundary Interactive is an indie studio building mixed-reality games for Meta Quest. Wishlist Fly Exterminator — coming June 2026."
  },
  game: {
    title: `Fly Exterminator — Coming ${game.releaseWindow} | Meta Quest 3 MR Game`,
    description: `${game.pitch} ${game.status} on Meta Quest 3 — wishlist on the Meta Store.`
  },
  devlogIndex: {
    title: "Fly Exterminator Devlog | Boundary Interactive",
    description:
      "Development updates, playtest learnings, and launch progress for Fly Exterminator on Meta Quest 3."
  },
  about: {
    title: "Studio & Team | Boundary Interactive",
    description:
      "Meet Boundary Interactive, the two-person indie studio behind Fly Exterminator for Meta Quest mixed reality."
  },
  press: {
    title: "Press Kit | Fly Exterminator & Boundary Interactive",
    description:
      "Press assets, official links, and contact info for Fly Exterminator — mixed-reality game for Meta Quest 3."
  },
  contact: {
    title: "Contact | Boundary Interactive",
    description:
      "Contact Boundary Interactive for press, business, and collaboration inquiries about Fly Exterminator."
  }
} as const;

export function devlogPostSeo(title: string, summary: string) {
  const trimmed =
    summary.length > 155 ? `${summary.slice(0, 152).trimEnd()}…` : summary;
  return {
    title: `${title} | Fly Exterminator Devlog`,
    description: trimmed
  };
}

export const devlogAuthors = teamMembers.map((m) => m.name);
