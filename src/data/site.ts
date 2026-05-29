/** Canonical launch + studio data. Update here when store status or links change. */

const youtubeTrailerId = "pCl-uN2TTYY";

export const links = {
  metaStore: "https://www.meta.com/experiences/fly-exterminator/26967497566216109",
  youtubeChannel: "https://www.youtube.com/@FlyExterminatorGame",
  youtubeTrailer: `https://www.youtube.com/watch?v=${youtubeTrailerId}`,
  linkedinCompany: "https://www.linkedin.com/company/boundary-interactive-llc/",
  discord: "https://discord.gg/9hhGvvrBD2"
} as const;

/** Public site URL (GitHub Pages). Use in external channel bios for backlinks. */
export const siteUrl = "https://sypherxn.github.io/Boundary-Interactive-Website/";

/** Browser chrome color (matches --bg-elevated). */
export const themeColor = "#2a3140";

/**
 * Studio logo paths (under /public). Paired with the dark site theme in global.css.
 *
 * | Where                         | Asset                    |
 * |-------------------------------|--------------------------|
 * | Header icon, home wordmark    | icon/wordmark transparent |
 * | Favicon (SVG)                 | icon transparent          |
 * | Favicon (PNG), Apple touch    | icon charcoal-*           |
 * | JSON-LD, press opaque PNGs    | charcoal                  |
 */
export const brand = {
  icon: {
    /** Transparent SVG — white dashes + teal BI (use on dark backgrounds). */
    default: "/brand/icon/transparent.svg",
    transparent: "/brand/icon/transparent.svg",
    /** Opaque charcoal badge — iOS, structured data, press. */
    opaque: "/brand/icon/charcoal.svg",
    opaquePng: "/brand/icon/charcoal.png"
  },
  wordmark: {
    default: "/brand/wordmark/transparent.svg",
    transparent: "/brand/wordmark/transparent.svg",
    opaque: "/brand/wordmark/charcoal.svg",
    opaquePng: "/brand/wordmark/charcoal.png"
  },
  appleTouchIcon: "/brand/icon/charcoal-180.png",
  favicon32: "/brand/icon/charcoal-32.png"
} as const;

/** GA4 measurement ID (public in page source). Used for analytics and Search Console verification. */
export const gaMeasurementId = "G-21WBCSSXC4";

/** Where to paste `siteUrl` on external profiles (manual off-site SEO). */
export const externalBacklinkChecklist = [
  {
    channel: "LinkedIn Company Page",
    field: "Website",
    profileUrl: links.linkedinCompany
  },
  {
    channel: "YouTube — @FlyExterminatorGame",
    field: "About → Links → Official website",
    profileUrl: links.youtubeChannel
  },
  {
    channel: "Meta Store listing",
    field: "Developer / support links where available",
    profileUrl: links.metaStore
  },
  {
    channel: "Fly Exterminator Discord",
    field: "Server invite / community link",
    profileUrl: links.discord
  }
] as const;

export const studio = {
  name: "Boundary Interactive",
  legalName: "Boundary Interactive LLC",
  description:
    "Boundary Interactive is a two-person indie game studio building mixed-reality games for Meta Quest.",
  contactEmail: "boundaryinteractivellc@gmail.com",
  socialLinks: [
    { label: "Boundary Interactive LinkedIn", href: links.linkedinCompany },
    { label: "Meta Store", href: links.metaStore },
    { label: "Fly Exterminator Discord", href: links.discord },
    { label: "Press Kit", href: "/press" }
  ]
};

export const teamMembers = [
  {
    name: "Matthew Tran",
    role: "Co-Founder, Game Designer, Developer",
    photo: "/images/team/matthew-tran.png",
    bio: "Matthew co-founded Boundary Interactive and leads design and development for Fly Exterminator.",
    responsibilities:
      "Core gameplay loop design, mixed-reality interactions, player-facing UI, and iteration from playtest feedback.",
    links: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/mgtran/" },
      { label: "Website", href: "https://matthewgtran.com" }
    ]
  },
  {
    name: "Chaeho Shin",
    role: "Co-Founder, Developer",
    photo: "/images/team/chaeho-shin.png",
    bio: "Chaeho co-founded Boundary Interactive and co-develops Fly Exterminator across production milestones.",
    responsibilities:
      "Co-development across engineering and feature delivery, development workflow, and production execution.",
    links: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/chaeho-shin/" },
      {
        label: "Website",
        href: "https://chaehoshin.notion.site/Chaeho-Shin-c6c7843258a34a4292269cb130526c1b"
      }
    ]
  }
];

export const game = {
  title: "Fly Exterminator",
  status: "Coming Soon",
  releaseWindow: "June 2026",
  platform: "Meta Quest 3",
  genres: ["Arcade", "Action", "Simulation"],
  rating: "Everyone",
  storeUrl: links.metaStore,
  /** Player support, press, and game-specific inquiries */
  contactEmail: "flyexterminatorgame@gmail.com",
  pitch:
    "Catch virtual flies in your real room with quick-reflex mixed-reality gameplay built for Meta Quest 3.",
  shortDescription:
    "Fly Exterminator is an arcade-style mixed-reality game where players chase flies integrated into their physical environment through Quest scene understanding.",
  trailerEmbedUrl: `https://www.youtube.com/embed/${youtubeTrailerId}`
};

/** Press kit download/list links (paths are under /public). */
export const pressKitAssets = [
  {
    label: "Studio icon (SVG, transparent)",
    href: brand.icon.default,
    type: "Logos"
  },
  {
    label: "Studio icon (PNG, charcoal background)",
    href: brand.icon.opaquePng,
    type: "Logos"
  },
  {
    label: "Studio wordmark (SVG, transparent)",
    href: brand.wordmark.default,
    type: "Logos"
  },
  {
    label: "Studio wordmark (PNG, charcoal background)",
    href: brand.wordmark.opaquePng,
    type: "Logos"
  },
  {
    label: "Fly Exterminator key art (PNG)",
    href: "/images/game/fly-exterminator-hero-art.png",
    type: "Screenshots"
  },
  {
    label: "Fly Exterminator cover art (PNG)",
    href: "/images/game/fly-exterminator-cover-wide.png",
    type: "Screenshots"
  },
  {
    label: "Fly Exterminator in-game UI (PNG)",
    href: "/images/game/fly-exterminator-ui.png",
    type: "Screenshots"
  },
  {
    label: "Meta Store listing (more screenshots)",
    href: links.metaStore,
    type: "Screenshots"
  },
  {
    label: "Fly Exterminator Trailer Listing",
    href: links.youtubeTrailer,
    type: "Trailer"
  },
  {
    label: "Fly Exterminator Discord Community",
    href: links.discord,
    type: "Community"
  }
] as const;

/** Default social preview image (1200×630, path under /public). */
export const defaultOgImage = "/og-social.png";
