const express = require("express");
const router = express.Router();
const mainPageController = require("../controllers/mainPageController");

router.get("/trending/all/week", mainPageController.getTrendingData);
router.get("/configuration", mainPageController.getConfiguration);
router.get("/movie/now_playing", mainPageController.getNowPlayingMovies);
router.get("/movie/top_rated", mainPageController.getTopRatedMovies);
router.get("/tv/popular", mainPageController.getPopularTVShows);
router.get("/tv/on_the_air", mainPageController.getOnTheAirTVShows);
router.get("/discover/:explore", mainPageController.discoverMedia);
router.get("/:explore/:id", mainPageController.getMediaDetails); // Fetch media details
router.get("/:explore/:id/credits", mainPageController.getMediaCredits); // Fetch media credits
router.get("/:explore/:id/similar", mainPageController.getSimilarMedia); // Fetch similar media
router.get(
  "/:explore/:id/recommendations",
  mainPageController.getRecommendations
); // Fetch recommendations
// router.get("/search/multi", mainPageController.searchData);

module.exports = router;
