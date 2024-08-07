const schedule = require('node-schedule');
const { scrapeTwitterAccounts } = require('./scraper');

const scheduleScraping = (accounts, ticker, interval, callback) => {
  schedule.scheduleJob(`*/${interval} * * * *`, async () => {
    const results = await scrapeTwitterAccounts(accounts, ticker);
    callback(results);
  });
};

module.exports = { scheduleScraping };
