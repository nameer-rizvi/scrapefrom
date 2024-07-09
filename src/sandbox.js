const scrapefrom = require("./index");

// fetch options: logFetch, fetch, name, url, api, responseParser
// puppeteer options: timeout = 30000, logFetch, name, url, api, waitForSelector, pageGoTo, selectDropdown, index, responseParser

scrapefrom({
  url: "https://dcmusic.live/",
  extracts: [
    {
      json: true,
      name: "event_names",
      filter: (json) => json["@type"] === "Event",
      keyPath: { name: "name" },
    },
  ],
})
  .then(console.log)
  .catch(console.log);
