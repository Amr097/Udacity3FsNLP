import { fetchApi } from "../fetchApi";

// Mock the global fetch function
global.fetch = jest.fn();

// Mock the DOM manipulation function
document.getElementById = jest.fn(() => ({
  innerHTML: "",
}));

describe("fetchApi function", () => {
  beforeEach(() => {
    // Reset the mocks before each test
    global.fetch = jest.fn();
    document.getElementById = jest.fn(() => ({
      innerHTML: "",
    }));
  });

  it("should fetch data successfully and update DOM", async () => {
    // Mock response from the fetch call
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({
        status: { msg: "OK" },
        score_tag: "P",
        subjectivity: "Objective",
        sentence_list: [{ text: "This is a test sentence." }],
      }),
    };

    // Mock fetch to resolve with the mock response
    global.fetch.mockResolvedValue(mockResponse);

    // Mock DOM manipulation to return a mock element with innerHTML property
    const mockElement = { innerHTML: "" };
    document.getElementById.mockReturnValue(mockElement);

    // Call the function with a test URL
    await fetchApi("https://example.com");

    // Verify fetch was called with the correct URL
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("https://api.meaningcloud.com/sentiment-2.1")
    );
    // Verify document.getElementById was called with "results"
    expect(document.getElementById).toHaveBeenCalledWith("results");
    // Verify that the DOM was updated with the correct content
    expect(document.getElementById().innerHTML).toBe(
      "Polarity: positive<br>Subjectivity: objective<br>Text: This is a test sentence."
    );
  });

  it("should handle non-200 status code", async () => {
    // Mock fetch to resolve with a non-200 response
    global.fetch.mockResolvedValueOnce({
      ok: false,
      json: jest.fn(),
    });

    // Mock console.error and window.alert to verify their calls
    console.error = jest.fn();
    window.alert = jest.fn();

    // Assert that the function throws an error when fetch fails
    await expect(fetchApi("https://example.com")).rejects.toThrow(
      "Failed to fetch data"
    );

    // Verify that console.error was called with the expected error message
    expect(console.error).toHaveBeenCalledWith(
      "Error fetching data:",
      expect.any(Error)
    );
    // Verify that window.alert was called with the expected error message
    expect(window.alert).toHaveBeenCalledWith("Failed to fetch data");
  });

  it("should handle API error response", async () => {
    // Mock response to simulate API error
    const mockResponse = {
      status: { msg: "ERROR" },
    };

    // Mock fetch to resolve with an API error response
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    });

    // Mock console.error and window.alert to verify their calls
    console.error = jest.fn();
    window.alert = jest.fn();

    // Assert that the function throws an error for API error response
    await expect(fetchApi("https://example.com")).rejects.toThrow(
      "Failed to fetch required data"
    );

    // Verify that console.error was called with the expected error message
    expect(console.error).toHaveBeenCalledWith(
      "Error fetching data:",
      expect.any(Error)
    );
    // Verify that window.alert was called with the expected error message
    expect(window.alert).toHaveBeenCalledWith("Failed to fetch required data");
  });

  it("should handle network errors", async () => {
    // Mock fetch to simulate a network error
    global.fetch.mockRejectedValueOnce(new Error("Network error"));

    // Mock console.error and window.alert to verify their calls
    console.error = jest.fn();
    window.alert = jest.fn();

    // Assert that the function throws an error for network errors
    await expect(fetchApi("https://example.com")).rejects.toThrow(
      "Network error"
    );

    // Verify that console.error was called with the expected error message
    expect(console.error).toHaveBeenCalledWith(
      "Error fetching data:",
      expect.any(Error)
    );
    // Verify that window.alert was called with the expected error message
    expect(window.alert).toHaveBeenCalledWith("Network error");
  });

  it("should construct the correct URL", async () => {
    // Mock response for URL construction test
    const mockResponse = {
      status: { msg: "OK" },
      score_tag: "P",
      subjectivity: "Objective",
      sentence_list: [{ text: "This is a test sentence." }],
    };

    // Mock fetch to resolve with the mock response
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    });

    // Test URL
    const testUrl = "https://example.com";
    // Call the function with the test URL
    await fetchApi(testUrl);

    // Construct the expected URL
    const expectedUrl = `https://api.meaningcloud.com/sentiment-2.1?key=${process.env.API_KEY}&lang=en&model=general&url=${testUrl}`;
    // Verify fetch was called with the correct URL
    expect(global.fetch).toHaveBeenCalledWith(expectedUrl);
  });
});
