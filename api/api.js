const { default: axios } = require("axios");
const express = require("express");
const cors = require("cors");



const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

const port = 4000

app.get('/', (req, res) => {
   let url =req.query.url
   axios.get(url)
        .then((response) => {
          res.json(response.data)
        })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})