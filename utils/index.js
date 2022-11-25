function utils(web3, bybitSpot) {
  const toBN = n => web3.utils.toBN(n);

  const getLastPrice = async () =>
    parseFloat((await bybitSpot.getLastTradedPrice("ETHUSDT")).result.price);

  const getExpirySymbol = (expiry, lastPrice) => {
    const expiryDate = new Date(expiry * 1000);
    const month = expiryDate.toLocaleString("default", { month: "short" });
    const day = expiryDate.getUTCDate();
    const year = expiryDate
      .getFullYear()
      .toString()
      .slice(-2);
    // Compute strike closest to last price
    let closest = (Math.floor(lastPrice / 25) * 25).toString();
    return `ETH-${day}${month.toUpperCase()}${year}-${closest}-P`;
  };

  return {
    toBN,
    getLastPrice,
    getExpirySymbol
  };
}

module.exports = utils;