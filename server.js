const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const https = require("https");
const fs = require("fs");

const port = process.env.PORT || 5000;

const app = express();

const sslServer = https.createServer(
  {
    key: "",
    cert: "",
  },
  app
);

app.use(express.static("client/build"));

app.get("/*", (__, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
