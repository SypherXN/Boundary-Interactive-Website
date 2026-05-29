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
  about: [
    "Boundary Interactive is a Los Angeles–area indie studio co-founded by Matthew Tran and Chaeho Shin. We design and build mixed-reality games where your real room is the playspace—not a virtual backdrop.",
    "Our launch title, Fly Exterminator, grew from Quest 3 prototypes that tested spatial audio, room mesh collision, and hand-tracked swatting, through alpha and beta milestones, to a USC Games Expo 2026 showcase. We are polishing toward Early Access on Meta Store.",
    "We share in-progress work on the devlog and welcome press, playtest feedback, and collaboration inquiries through our contact page."
  ],
  socialLinks: [
    { label: "Boundary Interactive LinkedIn", href: links.linkedinCompany },
    { label: "Meta Store listing", href: links.metaStore },
    { label: "Fly Exterminator YouTube", href: links.youtubeChannel },
    { label: "Official trailer", href: links.youtubeTrailer },
    { label: "Fly Exterminator Discord", href: links.discord },
    { label: "Press kit", href: "/press" }
  ]
};

/** Shown on the press kit for asset attribution. */
export const pressCredits =
  "Fly Exterminator logo and cover art refresh (2026 showcase materials): Yan YiAn.";

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
  /** Customer-facing launch label (use on badges, press, SEO). */
  status: "Early Access",
  releaseWindow: "June 2026",
  /** Compact status line for hero badges. */
  statusBadge: "Early Access · June 2026",
  /** Longer release line for FAQ and press. */
  releaseTarget: "Early Access on Meta Store, targeting late June 2026",
  platform: "Meta Quest 3",
  genres: ["Arcade", "Action", "Simulation"],
  rating: "Everyone",
  storeUrl: links.metaStore,
  /** Player support, press, and game-specific inquiries */
  contactEmail: "flyexterminatorgame@gmail.com",
  pitch:
    "Swat virtual flies in your real room. Fly Exterminator is a mixed-reality arcade game for Meta Quest 3 where hand-tracked reflexes, spatial audio, and room-scale play come together in fast score-chasing sessions.",
  shortDescription:
    "Flies buzz through your scanned play space along furniture, walls, and floors. Listen for audio cues, track movement with your eyes, and slap them out of the air with your hands—no controllers required for the core catch.",
  highlights: [
    "Mixed reality anchored to your room with Quest scene understanding and spatial mesh.",
    "Hand-tracked swatting tuned for natural, quick-reaction fly catches.",
    "Spatial audio helps you locate flies as they move around your physical space.",
    "Time Attack and additional modes built for short, replayable score runs.",
    "Repositionable in-headset UI so menus stay readable anywhere in your play area.",
    "Leaderboards, tutorials, and progression shaped through alpha, beta, and expo playtests."
  ],
  howItPlays: [
    "Set up your play space with Quest room scanning so flies can travel along real surfaces.",
    "Follow buzzing spatial audio and visual movement to find the next target.",
    "Swat with your hands to catch flies and build score within the active mode timer.",
    "Push for higher ranks on the leaderboard as difficulty and pace escalate."
  ],
  about: [
    "Fly Exterminator is built around Meta Quest 3 mixed reality: your room becomes the level. Flies travel along scanned surfaces while you move through your real space to intercept them.",
    "Early prototypes validated directional audio and room-mesh hand collision. Alpha added tutorials, leaderboards, progression, and multiple modes—including Food Defense with escalating challenge. Beta focused on UI readability, fly visibility, and playtest-driven balancing.",
    "For USC Games Expo 2026 we streamlined the demo around Time Attack, movable UI, and a stable showcase build. We are now polishing toward Early Access on Meta Store."
  ],
  /** ISO date for structured data (Early Access target). */
  releaseDateIso: "2026-06-30",
  developmentTimeline:
    "Prototyping (spatial audio, room mesh, hand collision) → vertical slice and alpha (modes, tutorials, leaderboards, Food Defense escalation) → beta UI and playtest polish → USC Games Expo 2026 showcase → Early Access prep on Meta Quest 3.",
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
    label: "Quest room scanning development screenshot (PNG)",
    href: "/images/game/meta-quest-room-scanning.png",
    type: "Screenshots"
  },
  {
    label: "Fly Exterminator game logo (PNG)",
    href: "/images/game/fly-exterminator-logo.png",
    type: "Logos"
  },
  {
    label: "Meta Store listing (more screenshots)",
    href: links.metaStore,
    type: "Screenshots"
  },
  {
    label: "Official trailer (YouTube watch page)",
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
