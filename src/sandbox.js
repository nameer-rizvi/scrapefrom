// For testing configs/features.

const scrapefrom = require("./index");
const samples = require("./samples");

scrapefrom(samples.customConfig)
  .then((data) => console.log(data[0]))
  .catch((err) => console.log(err));
