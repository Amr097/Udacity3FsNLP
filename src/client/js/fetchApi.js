export async function fetchApi(url) {
  const baseUrl = "https://api.meaningcloud.com/sentiment-2.1";
  const apiKey = process.env.API_KEY;
  const lang = "en";
  const model = "general";

  const finalUrl = `${baseUrl}?key=${apiKey}&lang=${lang}&model=${model}&url=${url}`;

  try {
    const response = await fetch(finalUrl);
    if (!response.ok) throw new Error("Failed to fetch data");

    const data = await response.json();
    if (data && data.status && data.status.msg.toLowerCase() !== "ok") {
      throw new Error("Failed to fetch required data");
    }

    const { score_tag, subjectivity, sentence_list } = data;
    const polarity = score_tag === "P" ? "positive" : "negative";
    const text = sentence_list[0].text;

    const content = `Polarity: ${polarity}<br>Subjectivity: ${subjectivity.toLowerCase()}<br>Text: ${text}`;
    document.getElementById("results").innerHTML = content;

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    alert(error.message);
    throw error;
  }
}
