import { devlogShareImages, images } from "./images";
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
      "Boundary Interactive builds mixed-reality games for Meta Quest. Fly Exterminator Early Access on Meta Store, targeting late June 2026."
  },
  about: {
    title: "Studio & Team | Boundary Interactive",
    description:
      "Meet Boundary Interactive, the two-person indie studio behind Fly Exterminator. USC Games Expo 2026 showcase; Early Access targeting late June 2026."
  },
  press: {
    title: "Press Kit | Fly Exterminator & Boundary Interactive",
    description:
      "Press assets and facts for Fly Exterminator — mixed-reality arcade game for Meta Quest 3. Early Access targeting late June 2026 on Meta Store."
  },
  contact: {
    title: "Contact | Boundary Interactive",
    description:
      "Contact Boundary Interactive for studio, press, and business inquiries. Fly Exterminator press and support: flyexterminatorgame@gmail.com."
  },
  devlogIndex: {
    title: "Fly Exterminator Devlog | Boundary Interactive",
    description:
      "Development updates from prototyping through USC Games Expo 2026 and Early Access prep for Fly Exterminator on Meta Quest 3."
  },
  game: {
    title: `Fly Exterminator — Early Access ${game.releaseWindow} | Meta Quest 3 MR Game`,
    description: `${game.pitch} ${game.status} (${game.releaseTarget}). Wishlist on Meta Store.`
  }
} as const;

/** Social preview for a devlog post (optional `ogImage` path in frontmatter). */
export function devlogOgForPost(ogImage?: string) {
  if (!ogImage) return socialOgImage;
  const entry = devlogShareImages[ogImage];
  if (!entry) return socialOgImage;
  return {
    path: entry.src,
    width: entry.width,
    height: entry.height,
    alt: `Fly Exterminator devlog — ${entry.src.split("/").pop()}`
  };
}

export function devlogPostSeo(title: string, summary: string) {
  const trimmed =
    summary.length > 155 ? `${summary.slice(0, 152).trimEnd()}…` : summary;
  return {
    title: `${title} | Fly Exterminator Devlog`,
    description: trimmed
  };
}

export const devlogAuthors = teamMembers.map((m) => m.name);
