// For testing configs/features.

const scrapefrom = require("./index");
const { yahooFinance } = require("./samples");

scrapefrom(yahooFinance)
  .then((data) => console.log(data[0].length))
  .catch((err) => console.log(err));
