async function checkForUrl(url) {
  try {
    // Check if url is valid
    if (!isValidUrl(url)) {
      throw new Error("Invalid URL format");
    }
    return url;
  } catch (error) {
    console.error("Error:", error.message);
    document.getElementById("results").innerHTML = error.message;
  }
}

function isValidUrl(url) {
  const regex = new RegExp(
    "^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?"
  );

  return regex.test(url);
}

export { checkForUrl, isValidUrl };
