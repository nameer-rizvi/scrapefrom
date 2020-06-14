const validate = require("./validate/index");
const scraper = require("./scraper");

module.exports = (config, structuredDataConfig) =>
  new Promise((resolve, reject) =>
    validate(config, structuredDataConfig)
      .then(scraper)
      .then(resolve)
      .catch((err) => reject(`🚫 [scrapefrom] ${err}.`))
  );
