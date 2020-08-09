// For testing configs/features.

const scrapefrom = require("./index");
const { twitter: config, customConfig } = require("./samples");

scrapefrom(customConfig)
  .then((data) => console.log(data[0]))
  .catch((err) => console.log(err));
