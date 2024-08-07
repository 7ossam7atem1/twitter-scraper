const formatResults = (ticker, count, interval, results) => {
  return {
    message: 'Data scraped successfully',
    Summary: `'${ticker}' was mentioned '${count}' times in the last '${interval}' minutes`,
    details: results.map((result) => ({
      account: result.account,
      mentions: result.mentions,
      interval,
    })),
  };
};

module.exports = { formatResults };
