const scrapefrom = require("./index");

// fetch options: logFetch, fetch, name, url, api, responseParser
// puppeteer options: timeout = 30000, logFetch, name, url, api, waitForSelector, pageGoTo, selectDropdown, index, responseParser
scrapefrom({
  url: "https://www.npmjs.com/package/async-fetch",
  extract: {
    selector: "tbody tr",
    name: "rows",
    extracts: [
      { selector: "td:nth-child(1)", name: "key" },
      { selector: "td:nth-child(2)", name: "type" },
      { selector: "td:nth-child(3)", name: "definition" },
      { selector: "td:nth-child(4)", name: "default" },
    ],
  },
}).then((r) => console.log(r.result.rows));
