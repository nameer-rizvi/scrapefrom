const scrapefrom = require("./index");

// fetch options: logFetch, fetch, name, url, api, responseParser
// puppeteer options: timeout = 30000, logFetch, name, url, api, waitForSelector, pageGoTo, selectDropdown, index, responseParser,

scrapefrom({
  name: "NPM: Scrapefrom",
  url: "https://www.npmjs.com/package/scrapefrom",
  extracts: [{ name: "titles", selector: "h1", delimiter: null }],
  fetch: { timeout: 30000 },
  logFetch: true,
  use: "puppeteer",
})
  .then(console.log)
  .catch(console.log);
