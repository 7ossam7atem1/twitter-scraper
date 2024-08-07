
# Twitter Scraping Tool

This tool is designed to scrape specified Twitter accounts for mentions of stock symbols without using the Twitter API. It utilizes Puppeteer to navigate Twitter profiles and extract relevant mentions, providing an efficient way to gather data for stock analysis.

## Features

- Scrapes multiple Twitter accounts for stock symbol mentions.
- Summarizes the total mentions across all accounts.
- Configurable scraping interval using a scheduler.
- Robust error handling with clear responses.
## Requirements
- Node.js (version 12 or higher)
- npm (version 6 or higher)

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/7ossam7atem1/twitter-scraper.git
   cd witter-scraper
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

    
## Usage/Examples

1. Start the server:
   ```sh
   npm run start
   ```
2. Make a POST request to the `/scrape` endpoint with the required parameters.

### Example POST Request:

```json
{
  "accounts": [
    "https://twitter.com/Mr_Derivatives",
    "https://twitter.com/warrior_0719"
  ],
  "ticker": "$NVDA",
  "interval": 15
}
```


## Error Handling
The application uses a custom `AppError` class for error handling. Errors are caught and processed through a global error handling middleware to ensure that appropriate responses are sent to the client.
## Documentation

[Postman API Documentation](https://documenter.getpostman.com/view/30045330/2sA3rzKt5Y)


## License

[MIT](https://choosealicense.com/licenses/mit/)

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

## Authors

- [@7ossam7atem1](https://www.github.com/7ossam7atem1)

