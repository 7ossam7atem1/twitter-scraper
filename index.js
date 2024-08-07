const express = require('express');
const { scrapeTwitterAccounts } = require('./service/scrapingService');
const { formatResults } = require('./utils/outputHandeling');
const catchAsync = require('./utils/catchAsync');
const AppError = require('./utils/apiError');

const app = express();
const port = 3000;

app.use(express.json());

app.post(
  '/scrape',
  catchAsync(async (req, res, next) => {
    const { accounts, ticker, interval } = req.body;

    if (!accounts || !ticker || !interval) {
      return next(
        new AppError(
          'Missing required parameters: accounts, ticker, interval',
          400
        )
      );
    }

    const results = await scrapeTwitterAccounts(accounts, ticker);
    const totalMentions = results.reduce(
      (sum, result) => sum + result.mentions,
      0
    );
    const response = formatResults(ticker, totalMentions, interval, results);
    res.json(response);
  })
);

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'Error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
