const axios = require("axios");

//videos of onwers's channels.
exports.singleChannelVideos = async (req, res) => {
  const response = await axios
    .create({
      baseURL: "https://www.googleapis.com/youtube/v3/",
    })
    .get("channels", {
      headers: {
        Authorization: `Bearer ${req.query.token}`,
        "Content-Type": "application/json",
      },
      params: {
        part: "contentDetails",
        mine: true,
        maxResults: 10,
        key: req.query.key,
      },
    });
  const id = response.data.items.map((id) => {
    return id.contentDetails.relatedPlaylists.uploads;
  });
  const response1 = await axios
    .create({
      baseURL: "https://www.googleapis.com/youtube/v3/",
    })
    .get("/playlistItems", {
      headers: {
        Authorization: `Bearer ${req.query.token}`,
        "Content-Type": "application/json",
      },
      params: {
        part: "snippet,contentDetails",
        playlistId: id.join(""),
        key: req.query.key,
      },
    });
    res.send(response1.data.items);
  
};

// user's channel playlist
exports.playlistList = async (req, res) => {
  console.log(req.query.token);

  const response = await axios
    .create({
      baseURL: "https://www.googleapis.com/youtube/v3/",
    })
    .get("playlists", {
      headers: {
        Authorization: `Bearer ${req.query.token}`,
        "Content-Type": "application/json",
      },
      params: {
        part: "snippet,contentDetails, id",
        mine: true,
        maxResults: 25,
        key: req.query.key,
      },
    });

  res.send(response.data.items);
};


// playlist videos
exports.playlistVideos = async (req, res) => {
  console.log(req.query.token);

  const response = await axios
    .create({
      baseURL: "https://www.googleapis.com/youtube/v3/",
    })
    .get("/playlistItems", {
      headers: {
        Authorization: `Bearer ${req.query.token}`,
        "Content-Type": "application/json",
      },
      params: {
        part: "snippet, contentDetails, id",
        playlistId: req.query.playlistId,
      },
    });

  res.send(response.data.items);
};

// "about details" of the owner of the channel
exports.creatorAbout = async (req, res) => {
  console.log(req.query.token);

  const response = await axios
    .create({
      baseURL: "https://www.googleapis.com/youtube/v3/",
    })
    .get("/channels", {
      headers: {
        Authorization: `Bearer ${req.query.token}`,
        "Content-Type": "application/json",
      },
      params: {
        part: "snippet,statistics",
        mine: true,
        key: req.query.key,
      },
    });

  res.send(response.data.items);
};

// featured videos
exports.featuredVideos = async (req, res) => {
  console.log(req.query.token);

  const response = await axios
    .create({
      baseURL: "https://www.googleapis.com/youtube/v3/",
    })
    .get("/videos", {
      headers: {
        Authorization: `Bearer ${req.query.token}`,
        "Content-Type": "application/json",
      },
      params: {
        part: "snippet, contentDetails, statistics",
        chart: "mostPopular",
        regionCode: "PK",
        maxResults: 8,
        key: req.query.key,
      },
    });

  res.send(response.data.items);
};