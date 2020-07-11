// For testing configs/features.

const scrapefrom = require("./index");
const { twitter: config } = require("./samples");

scrapefrom(config("washington capitals"))
  .then((data) => console.log(data[0]))
  .catch((err) => console.log(err));
