/** Canonical launch + studio data. Update here when store status or links change. */

const youtubeTrailerId = "pCl-uN2TTYY";

export const links = {
  metaStore: "https://www.meta.com/experiences/fly-exterminator/26967497566216109",
  youtubeChannel: "https://www.youtube.com/@FlyExterminatorGame",
  youtubeTrailer: `https://www.youtube.com/watch?v=${youtubeTrailerId}`,
  linkedinCompany: "https://www.linkedin.com/company/boundary-interactive-llc/"
} as const;

/** Public site URL (GitHub Pages). Use in external channel bios for backlinks. */
export const siteUrl = "https://sypherxn.github.io/Boundary-Interactive-Website/";

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
  }
] as const;

export const studio = {
  name: "Boundary Interactive",
  legalName: "Boundary Interactive LLC",
  description:
    "Boundary Interactive is a two-person indie game studio building mixed-reality games for Meta Quest.",
  contactEmail: "flyexterminatorgame@gmail.com",
  socialLinks: [
    { label: "Boundary Interactive LinkedIn", href: links.linkedinCompany },
    { label: "Meta Store", href: links.metaStore },
    { label: "Press Kit", href: "/press" }
  ]
};

export const teamMembers = [
  {
    name: "Matthew Tran",
    role: "Co-Founder, Game Designer, Developer",
    photo: "/matthew-tran.png",
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
    photo: "/chaeho-shin.png",
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
  pitch:
    "Catch virtual flies in your real room with quick-reflex mixed-reality gameplay built for Meta Quest 3.",
  shortDescription:
    "Fly Exterminator is an arcade-style mixed-reality game where players chase flies integrated into their physical environment through Quest scene understanding.",
  trailerEmbedUrl: `https://www.youtube.com/embed/${youtubeTrailerId}`
};

/** Press kit download/list links (paths are under /public). */
export const pressKitAssets = [
  {
    label: "Boundary Interactive Logo Pack",
    href: "/fly-exterminator-logo.png",
    type: "Logos"
  },
  {
    label: "Fly Exterminator Screenshots",
    href: links.metaStore,
    type: "Screenshots"
  },
  {
    label: "Fly Exterminator Trailer Listing",
    href: links.youtubeTrailer,
    type: "Trailer"
  }
] as const;

/** Default social preview image (1200×630, path under /public). */
export const defaultOgImage = "/og-social.png";
