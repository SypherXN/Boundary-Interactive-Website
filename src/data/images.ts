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

const devlogShare = (src: string, width = 1024, height = 576) => ({ src, width, height });

/** Optional per-devlog social preview images (path → dimensions). */
export const devlogShareImages: Record<string, (typeof images)[keyof typeof images]> = {
  "/devlog/usc-games-expo-2026.png": images.devlogUscExpo,
  "/devlog/usc-expo-2026-01.png": devlogShare("/devlog/usc-expo-2026-01.png"),
  "/devlog/classlog-2025-01-audio-locate.png": devlogShare("/devlog/classlog-2025-01-audio-locate.png"),
  "/devlog/classlog-2025-01-room-scan-hands.png": devlogShare("/devlog/classlog-2025-01-room-scan-hands.png"),
  "/devlog/classlog-2025-01-cheap-obstacles.png": devlogShare("/devlog/classlog-2025-01-cheap-obstacles.png"),
  "/devlog/classlog-2025-01-cheap-room-collision.png": devlogShare("/devlog/classlog-2025-01-cheap-room-collision.png"),
  "/devlog/prototype1.png": devlogShare("/devlog/prototype1.png"),
  "/devlog/classlog-2025-02-vertical-slice-mode-select.png": devlogShare(
    "/devlog/classlog-2025-02-vertical-slice-mode-select.png"
  ),
  "/devlog/classlog-2025-03-alpha-frog-tutorial.png": devlogShare("/devlog/classlog-2025-03-alpha-frog-tutorial.png"),
  "/devlog/classlog-2025-03-alpha-leaderboard.png": devlogShare("/devlog/classlog-2025-03-alpha-leaderboard.png"),
  "/devlog/classlog-2025-04-beta-trailer-card.png": devlogShare("/devlog/classlog-2025-04-beta-trailer-card.png"),
  "/devlog/classlog-2025-05-release-candidate-gameplay.png": devlogShare(
    "/devlog/classlog-2025-05-release-candidate-gameplay.png"
  ),
  "/devlog/classlog-2025-05-coming-soon-card.png": devlogShare("/devlog/classlog-2025-05-coming-soon-card.png"),
  "/images/game/fly-exterminator-ui.png": images.gameUi,
  "/images/game/fly-exterminator-cover-wide.png": images.coverWide,
  "/images/game/fly-exterminator-hero-art.png": images.heroArt,
  "/images/game/fly-exterminator-logo.png": images.gameLogo,
  "/images/game/meta-quest-room-scanning.png": images.roomScanning
};
