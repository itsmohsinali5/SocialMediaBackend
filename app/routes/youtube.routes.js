const { authJwt } = require("../middleware");
const controller = require("../controllers/youtube.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.get("/youtube/api/my-channel-videos",  controller.singleChannelVideos);
  app.get("/youtube/api/playlist-list",  controller.playlistList);
  app.get("/youtube/api/playlist-videos",  controller.playlistVideos);
  app.get("/youtube/api/creator-about",  controller.creatorAbout);
  app.get("/youtube/api/featured-videos",  controller.featuredVideos);



  
};
