# NLP News Article Evaluation

## Project Overview

This project is a web application that allows users to run Natural Language Processing (NLP) on articles or blogs found on other websites. The application uses the MeaningCloud Sentiment Analysis API to analyze the content of the provided URL and return sentiment data.

## Features

- User input for article URL
- Sentiment analysis of the article content
- Display of polarity, subjectivity, and a sample of the analyzed text

## Technologies Used

- Frontend: HTML, SCSS, JavaScript
- Backend: Node.js, Express
- API: MeaningCloud Sentiment Analysis
- Build Tool: Webpack
- Testing: Jest

## Installation

1. Clone the repository:

   ```
   git clone [https://github.com/Amr097/Udacity3FsNLP]
   cd /Udacity3FsNLP
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add your MeaningCloud API key:
   ```
   API_KEY=your_meaningcloud_api_key
   SERVER_URL= http://localhost:8000/api
   ```

## Running the Application

### Production Mode

1. Build the project:

   ```
   npm run build-prod
   ```

2. Start the server:

   ```
   npm start
   ```

3. Open your browser and navigate to `http://localhost:8000`

### Development Mode

1. Start the webpack dev server:

   ```
   npm run build-dev
   ```

2. In a separate terminal, start the backend server:

   ```
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000`

## Usage

1. Enter a valid URL of an article or blog post in the input field.
2. Click the "Submit" button.
3. The sentiment analysis results will be displayed, including:
   - Polarity (positive or negative)
   - Subjectivity
   - A sample of the analyzed text

## Testing

Run the tests using Jest:

```
npm run test
```

## Additional Notes

- The project uses a service worker for offline functionality.
- Webpack is configured for both development and production environments.
