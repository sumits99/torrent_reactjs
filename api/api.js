const { default: axios } = require("axios");
const express = require("express");
const cors = require("cors");
const path = require("path")
const { qBittorrentClient } = require('@robertklep/qbittorrent');
const client = new qBittorrentClient('http://127.0.0.1:8080', 'admin', 'adminadmin');

const app = express();
app.use(
  cors({
    origin: "*",
  })
);

const port = 4000

// Serve the static files from the build folder
app.use(express.static(path.join(__dirname, '../build')));
// Serve the index.html file
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.get('/api', (req, res) => {
   let url =req.query.url
   axios.get(url)
        .then((response) => {
          res.set('Content-Security-Policy', "default-src 'self'; clipboard-write");
          res.json(response.data)
        })
})


app.get('/add-torrent', async (req, res) => {
  const magnetUrl = req.query.magnetUrl;
  const encodedMagnetUrl = magnetUrl;
  const decodedUrl = decodeURIComponent(encodedMagnetUrl);
  console.log(encodedMagnetUrl)
  console.log(decodedUrl)
  resp = await client.torrents.add(decodedUrl)
  res.send(resp);
})



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

