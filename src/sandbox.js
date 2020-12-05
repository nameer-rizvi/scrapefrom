// For testing configs/features.

const scrapefrom = require("./index");
const samples = require("./samples");

// const customConfig = {};

scrapefrom(samples.twitter("Washington Capitals"))
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
