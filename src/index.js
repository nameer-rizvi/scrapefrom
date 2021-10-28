const configurize = require("./1.configurize");
const fetchNodeResponses = require("./2.fetch.node");
const fetchPuppeteerResponses = require("./2.fetch.puppeteer");
// const dataExtraction = require("./3.extraction");

async function scrapefrom(input, callback) {
  try {
    const configs = configurize(input);

    await fetchNodeResponses(configs);

    await fetchPuppeteerResponses(configs);

    console.log(configs);

    // const results = await dataExtraction(configs);
    // if (callback) callback(null, results);
    // return results;
  } catch (error) {
    if (callback) callback(error);
    if (!callback) throw new Error(error);
  }
}

module.exports = scrapefrom;
