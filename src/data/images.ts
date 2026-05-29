/** Width/height for layout stability and OptimizedImage (paths under /public). */
export const images = {
  coverWide: { src: "/images/game/fly-exterminator-cover-wide.png", width: 1024, height: 307 },
  heroArt: { src: "/images/game/fly-exterminator-hero-art.png", width: 1024, height: 576 },
  gameLogo: { src: "/images/game/fly-exterminator-logo.png", width: 1024, height: 1024 },
  roomScanning: { src: "/images/game/meta-quest-room-scanning.png", width: 1024, height: 515 },
  gameUi: { src: "/images/game/fly-exterminator-ui.png", width: 1024, height: 579 },
  teamMatthew: { src: "/images/team/matthew-tran.png", width: 819, height: 1024 },
  teamChaeho: { src: "/images/team/chaeho-shin.png", width: 512, height: 610 },
  devlogUscExpo: { src: "/devlog/usc-games-expo-2026.png", width: 1024, height: 576 }
} as const;

/** Optional per-devlog social preview images (path → dimensions). */
export const devlogShareImages: Record<string, (typeof images)[keyof typeof images]> = {
  "/devlog/usc-games-expo-2026.png": images.devlogUscExpo,
  "/images/game/fly-exterminator-ui.png": images.gameUi,
  "/images/game/fly-exterminator-cover-wide.png": images.coverWide,
  "/images/game/fly-exterminator-hero-art.png": images.heroArt
};
