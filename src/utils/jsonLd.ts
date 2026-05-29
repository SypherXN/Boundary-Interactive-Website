import { game, links, siteUrl, studio, teamMembers } from "../data/site";
import { socialOgImage } from "../data/seo";
import { absoluteUrl } from "./absoluteUrl";

type SiteOrigin = URL | string;

function organizationRef(site: SiteOrigin) {
  return {
    "@type": "Organization" as const,
    name: studio.name,
    url: siteUrl
  };
}

export function buildOrganizationSchema(site: SiteOrigin) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: studio.name,
    legalName: studio.legalName,
    url: siteUrl,
    logo: absoluteUrl("/boundary-interactive-wordmark.svg", site),
    description: studio.description,
    email: studio.contactEmail,
    sameAs: [links.linkedinCompany, links.youtubeChannel, links.metaStore, links.discord]
  };
}

export function buildVideoGameSchema(site: SiteOrigin, pageUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: game.title,
    description: game.pitch,
    genre: game.genres,
    gamePlatform: game.platform,
    operatingSystem: game.platform,
    applicationCategory: "Game",
    contentRating: game.rating,
    url: pageUrl,
    image: absoluteUrl(socialOgImage.path, site),
    offers: {
      "@type": "Offer",
      url: game.storeUrl,
      availability: "https://schema.org/PreOrder",
      price: "0",
      priceCurrency: "USD"
    },
    publisher: organizationRef(site),
    trailer: {
      "@type": "VideoObject",
      name: `${game.title} Official Trailer`,
      url: links.youtubeTrailer,
      embedUrl: game.trailerEmbedUrl
    }
  };
}

export function buildBlogPostingSchema(options: {
  site: SiteOrigin;
  pageUrl: string;
  headline: string;
  description: string;
  datePublished: Date;
  dateModified?: Date;
}) {
  const { site, pageUrl, headline, description, datePublished, dateModified } = options;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline,
    description,
    datePublished: datePublished.toISOString(),
    dateModified: (dateModified ?? datePublished).toISOString(),
    author: teamMembers.map((member) => ({
      "@type": "Person",
      name: member.name
    })),
    publisher: {
      ...organizationRef(site),
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/boundary-interactive-icon.svg", site)
      }
    },
    image: absoluteUrl(socialOgImage.path, site),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl
    }
  };
}
