const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const artistRoutes = require("./routes/artists");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));

app.use(artistRoutes);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "lab5.html"));
});

app.listen(process.env.PORT || 8000);
