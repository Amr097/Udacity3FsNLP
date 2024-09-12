import { checkForUrl } from "./urlChecker";

const form = document.getElementById("urlForm");

if (form) {
  form.addEventListener("submit", handleSubmit);
}

async function handleSubmit(event) {
  event.preventDefault();

  // Get the URL from the input field
  const formText = document.getElementById("name").value;

  // Check if the URL is valid
  if (checkForUrl(formText)) {
    try {
      // Send the URL to the server
      const response = await fetch(process.env.SERVER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: formText }),
      });

      // Check if the response is ok
      if (!response.ok) {
        throw new Error(`Failed to get the data from the server`);
      }

      // Parse the JSON response
      const data = await response.json();

      const { polarity, subjectivity, text } = data.sentiment;

      // Update the DOM with the results
      const content = `Polarity: ${polarity}<br>Subjectivity: ${subjectivity}<br>Text: ${text}`;
      document.getElementById("results").innerHTML = content;
    } catch (error) {
      // If URL is not valid, show an error
      document.getElementById("results").innerHTML = `Error: ${error.message}`;
    }
  } else {
    document.getElementById("results").innerHTML = "Please enter a valid URL.";
  }
}

export { handleSubmit };
