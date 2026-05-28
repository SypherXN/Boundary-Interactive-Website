/**
 * GA4 custom event names used across the site (see src/scripts/ga-events.ts).
 * Register these as custom dimensions in GA4 Admin → Custom definitions if you want them in standard reports.
 */
export const gaEvents = {
  /** Meta Quest store / wishlist — primary conversion */
  metaStoreClick: "meta_store_click",
  /** YouTube channel link */
  youtubeChannelClick: "youtube_channel_click",
  /** Official trailer URL */
  trailerClick: "trailer_click",
  /** Trailer iframe scrolled into view on game page */
  trailerSectionView: "trailer_section_view",
  /** LinkedIn (company or personal) */
  linkedinClick: "linkedin_click",
  /** mailto: studio or press email */
  emailClick: "email_click",
  /** Devlog index → post */
  devlogPostClick: "devlog_post_click",
  /** Devlog article page load */
  devlogView: "devlog_view",
  /** Press kit asset or logo download */
  fileDownload: "file_download",
  /** Press asset link (Meta, YouTube, etc.) */
  pressAssetClick: "press_asset_click",
  /** Team member personal site */
  teamWebsiteClick: "team_website_click",
  /** Nav / CTA to key internal pages */
  gamePageClick: "game_page_click",
  pressPageClick: "press_page_click",
  devlogIndexClick: "devlog_index_click",
  aboutPageClick: "about_page_click",
  contactPageClick: "contact_page_click",
  /** Any other external link */
  outboundClick: "outbound_click",
  /** Scroll milestones 25 / 50 / 75 / 90 */
  scrollDepth: "scroll_depth"
} as const;
