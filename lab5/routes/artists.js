const express = require("express");
const router = express.Router();
let artists = require("../storage/artists.json");
const fs = require("fs");
const file = "./storage/artists.json";

router.get("/artists", (req, res) => {
  res.json(artists);
});

router.get("/artists/add", (req, res) => {
  //query params
  let name = req.query.name;
  let about = req.query.about;
  let url = req.query.url;
  let id = req.query.id;

  let newArtist = {
    name: name,
    about: about,
    url: url,
    id: id
  };

  artists.push(newArtist);

  updateJSONStorage(artists, file);

  res.json(newArtist);
});

router.get("/artists/delete", (req, res) => {
  let id = req.query.id;
  let removedArtistList = artists.filter(artist => artist.id !== parseInt(id));
  artists = removedArtistList;

  updateJSONStorage(artists, file);

  res.json(removedArtistList);
});

router.get("/artists/search", (req, res) => {
  let searchParam = req.query.searchParam;

  if (artists.length > 0) {
    let filteredArtists = artists.filter(
      artist => artist.name.toLowerCase().indexOf(searchParam) !== -1
    );
    res.json(filteredArtists);
  }
});

let updateJSONStorage = (json, file) => {
  fs.writeFile(file, JSON.stringify(json), err => {
    console.log("Error writing to " + file + ": ", err);
  });
};

module.exports = router;
