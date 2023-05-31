const configurize = require("./1.configurize");
const fetchResponses = require("./2.fetch");
const puppeteerResponses = require("./2.puppeteer");
const dataExtraction = require("./3.extraction.index");

async function scrapefrom(input) {
  const configs = configurize(input);

  await fetchResponses(configs);

  await puppeteerResponses(configs);

  const results = await dataExtraction(configs);

  return results;
}

module.exports = scrapefrom;
