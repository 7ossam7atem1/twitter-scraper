const puppeteer = require('puppeteer');
const AppError = require('../utils/apiError');

const scrapeTwitterAccounts = async (accounts, symbol) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  const results = [];

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  for (const account of accounts) {
    try {
      console.log(`Scraping ${account}`);
      await page.goto(account, { waitUntil: 'networkidle2' });

      await page.waitForSelector('div, span, p , article', { timeout: 20000 });

      let previousHeight;
      let attempts = 0;
      const maxAttempts = 5;

      while (attempts < maxAttempts) {
        previousHeight = await page.evaluate(() => document.body.scrollHeight);
        await page.evaluate(() =>
          window.scrollTo(0, document.body.scrollHeight)
        );
        await delay(3000);
        const newHeight = await page.evaluate(() => document.body.scrollHeight);
        if (newHeight === previousHeight) break;
        attempts++;
      }

      const mentions = await page.evaluate((symbol) => {
        let mentionsCount = 0;
        const tweetElements = document.querySelectorAll(
          'div, span, p, article'
        );
        tweetElements.forEach((tweet) => {
          if (tweet.innerText.includes(symbol)) {
            mentionsCount++;
          }
        });
        return mentionsCount;
      }, symbol);

      results.push({ account, mentions });
      console.log(`Found ${mentions} mentions in ${account}`);
    } catch (error) {
      console.error(`Error scraping ${account}:`, error.message);
      results.push({
        account,
        mentions: 0,
        error: 'Failed to scrape this account',
      });
    }
  }

  await browser.close();

  if (results.length === 0) {
    throw new AppError('No accounts could be scraped', 500);
  }

  return results;
};

module.exports = { scrapeTwitterAccounts };
