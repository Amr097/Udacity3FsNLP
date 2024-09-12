var path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("dist"));

console.log(__dirname);

app.get("/", function (req, res) {
  res.sendFile("/dist/index.html");
});

// POST Route
app.post("/api", async (req, res) => {
  const { url } = req.body;

  console.log(url);

  if (!url) {
    // If the URL is missing, send a 400 (Bad Request) response
    return res.status(400).json({ error: "URL parameter is required" });
  }

  try {
    // Call the API with the URL
    const sentimentData = await fetchSentimentAnalysis(url);

    // Send the sentiment data back to the client
    res.json({
      sentiment: sentimentData,
      message: `Sentiment analysis for the URL: ${url}`,
    });
  } catch (error) {
    console.error("Error fetching sentiment analysis:", error);
    res
      .status(500)
      .json({ error: "Failed to get data from sentiment analysis" });
  }
});

// Function to fetch sentiment analysis data from MeaningCloud API
async function fetchSentimentAnalysis(url) {
  const baseUrl = "https://api.meaningcloud.com/sentiment-2.1";
  const apiKey = process.env.API_KEY;
  const lang = "en";
  const model = "general";

  const finalUrl = `${baseUrl}?key=${apiKey}&lang=${lang}&model=${model}&url=${encodeURIComponent(
    url
  )}`;

  const response = await fetch(finalUrl);

  if (!response.ok)
    throw new Error("Failed to fetch data from MeaningCloud API");

  const data = await response.json();

  if (data.status && data.status.msg.toLowerCase() !== "ok") {
    throw new Error("Failed to fetch required data");
  }

  // Extract required fields from the API response
  const { score_tag, subjectivity, sentence_list } = data;
  const polarity = score_tag === "P" ? "positive" : "negative";
  const text = sentence_list[0].text;

  // Format the  result
  return {
    polarity,
    subjectivity: subjectivity.toLowerCase(),
    text,
  };
}

app.listen(8000, function () {
  console.log("Example app listening on port 8000!");
});
