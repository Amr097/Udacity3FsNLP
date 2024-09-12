import { isValidUrl, checkForUrl } from "../urlChecker";

describe("isValidUrl", () => {
  test("validates correct URL formats", () => {
    const validUrls = [
      "http://example.com",
      "https://example.com",
      "ftp://example.com",
      "www.example.com",
      "http://www.example.com/path?query=param",
      "http://example.com:8080",
    ];
    validUrls.forEach((url) => {
      expect(isValidUrl(url)).toBe(true);
    });
  });

  test("invalidates incorrect URL formats", () => {
    const invalidUrls = [
      "http//example.com",
      "http://",
      "://example.com",
      "example.com",
      "http://.com",
      "http://example",
    ];
    invalidUrls.forEach((url) => {
      expect(isValidUrl(url)).toBe(false);
    });
  });
});

describe("checkForUrl", () => {
  beforeEach(() => {
    // Mock console.error
    console.error = jest.fn();
    // Mock document.getElementById
    document.getElementById = jest.fn().mockReturnValue({
      innerHTML: "",
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test("returns the URL if it is valid", async () => {
    const validUrl = "http://example.com";
    const result = await checkForUrl(validUrl);
    expect(result).toBe(validUrl);
    expect(console.error).not.toHaveBeenCalled();
    expect(document.getElementById).not.toHaveBeenCalled();
  });

  test("throws an error and updates innerHTML if the URL is invalid", async () => {
    const invalidUrl = "invalid-url";
    const mockElement = { innerHTML: "" };
    document.getElementById.mockReturnValue(mockElement);

    await checkForUrl(invalidUrl);

    expect(console.error).toHaveBeenCalledWith("Error:", "Invalid URL format");
    expect(document.getElementById).toHaveBeenCalledWith("results");
    expect(mockElement.innerHTML).toBe("Invalid URL format");
  });
});
