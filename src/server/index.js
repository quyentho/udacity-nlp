var path = require("path");
const FormData = require("form-data");
const fetch = require("node-fetch");
const express = require("express");
const mockAPIResponse = require("./mockAPI.js");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const MEANNING_CLOUD_URL = `https://api.meaningcloud.com/sentiment-2.1`;

const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const cors = require("cors");
app.use(cors());

app.use(express.static("dist"));

app.get("/", function (req, res) {
  res.sendFile(`dist/index.html`);
});

app.post("/post", async (req, res) => {
  const data = req.body;
  // ?key=$&of=json&url={UserInput}&lang=en
  const formData = new FormData();
  formData.append("key", process.env.API_KEY);
  formData.append("of", "json");
  formData.append("lang", "en");
  formData.append("url", data.userInput);
  const response = await fetch(MEANNING_CLOUD_URL, {
    method: "POST",
    body: formData,
  });
  const result = await response.json();
  res.send(result);
});

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
  console.log("Example app listening on port 8080!");
});

app.get("/test", function (req, res) {
  res.send(mockAPIResponse);
});
