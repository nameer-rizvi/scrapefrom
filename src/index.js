const validate = require("./validate/index");
const scraper = require("./scraper");

module.exports = (config) =>
  new Promise((resolve, reject) =>
    validate(config)
      .then(scraper)
      .then(resolve)
      .catch((err) => reject(`🚫 [scrapefrom] ${err}.`))
  );
