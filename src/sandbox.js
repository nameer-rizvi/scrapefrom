const scrapefrom = require("./index");

// node-fetch options: logFetch, fetch, fetch.timeout, name, url, api, responseParser
// puppeteer options: timeout = 30000, logFetch, name, url, api, waitForSelector, pageGoTo, selectDropdown, index, responseParser,

scrapefrom({
  name: "NPM: Scrapefrom",
  url: "https://www.npmjs.com/package/scrapefrom",
  extract: { name: "titles", selector: "h1", delimiter: null },
  logFetch: true,
})
  .then((responses) => console.log(responses))
  .catch(console.log);
