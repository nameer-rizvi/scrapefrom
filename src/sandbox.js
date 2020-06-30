// For testing configs/features.

const scrapefrom = require("./index");
const { yahooFinance } = require("./samples");

scrapefrom(yahooFinance)
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
