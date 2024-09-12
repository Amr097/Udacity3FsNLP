// handleSubmit.test.js
import { handleSubmit } from "../formHandler";
import { checkForUrl } from "../urlChecker";

// Mock the checkForUrl function
jest.mock("../urlChecker", () => ({
  checkForUrl: jest.fn(),
}));

// Mock global fetch
global.fetch = jest.fn();

// Mock DOM methods
document.body.innerHTML = `
  <form id="urlForm">
    <input id="name" type="text" />
    <button type="submit">Submit</button>
  </form>
  <div id="results"></div>
`;

describe("handleSubmit", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should display results correctly when URL is valid and server responds with data", async () => {
    // Mocking checkForUrl to return true
    checkForUrl.mockReturnValue(true);

    // Mocking fetch to return a successful response
    fetch.mockResolvedValue({
      ok: true,
      json: async () => ({
        sentiment: {
          polarity: "positive",
          subjectivity: "subjective",
          text: "Sample text",
        },
      }),
    });

    // Mocking the input value
    document.getElementById("name").value = "http://example.com";

    await handleSubmit({ preventDefault: jest.fn() });

    expect(document.getElementById("results").innerHTML).toBe(
      "Polarity: positive<br>Subjectivity: subjective<br>Text: Sample text"
    );
  });

  test("should display error message when server response is not ok", async () => {
    // Mocking checkForUrl to return true
    checkForUrl.mockReturnValue(true);

    // Mocking fetch to return a failed response
    fetch.mockResolvedValue({
      ok: false,
    });

    // Mocking the input value
    document.getElementById("name").value = "http://example.com";

    await handleSubmit({ preventDefault: jest.fn() });

    expect(document.getElementById("results").innerHTML).toBe(
      "Error: Failed to retrieve data, either broken url or server failure."
    );
  });

  test("should display error message when fetch throws an error", async () => {
    // Mocking checkForUrl to return true
    checkForUrl.mockReturnValue(true);

    // Mocking fetch to throw an error
    fetch.mockRejectedValue(new Error("Network error"));

    // Mocking the input value
    document.getElementById("name").value = "http://example.com";

    await handleSubmit({ preventDefault: jest.fn() });

    expect(document.getElementById("results").innerHTML).toBe(
      "Error: Network error"
    );
  });
});
