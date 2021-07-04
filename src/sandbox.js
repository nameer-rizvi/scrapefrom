const scrapefrom = require("./index");

scrapefrom({
  use: "puppeteer",
  url: "https://www.unionstage.com/",
  // logFetch: true,
  pageGoTo: { timeout: 5000 },
  waitForSelector: "div.tessera-search-bar select",
  selectDropdown: ["div.tessera-search-bar select", "UNION STAGE"],
  extract: {
    selector: "div.tessera-show-card",
    name: "events",
    extracts: [
      { name: "date", selector: "div.tessera-date" },
      { name: "time", selector: "span.tessera-showTimes" },
      { name: "title", selector: "h4" },
      { name: "ageRestriction", selector: "span.tessera-showAges" },
      { name: "description", selector: "div.tessera-additionalArtists" },
      { name: "eventLink", selector: "a.more-info", attribute: "href" },
    ],
  },
})
  .then(console.log)
  .catch(console.log);

// scrapefrom({
//   use: "puppeteer",
//   //
//   // Using json response parser...
//   //
//   // url: "https://api.dcmusic.live/event/list",
//   // extractor: (data) => data.returnVenues,
//   //
//   // Using waitForSelector...
//   //
//   url:
//     "https://citywinery.com/washingtondc/Online/default.asp?BOparam::WScontent::loadArticle::permalink=washingtondc-buy-tickets&BOparam::WScontent::loadArticle::context_id=",
//   waitForSelector: ".result-box-item",
//   extract: {
//     selector: "div.result-box-item",
//     name: "events",
//     extracts: [
//       { selector: "div.item-name", name: "title" },
//       { selector: "span.start-date", name: "date" },
//       { selector: "span.start-date", name: "time" },
//       { selector: "div.item-venue", name: "status" },
//       { selector: "div.item-name a", name: "eventLink", attribute: "href" },
//     ],
//   },
// }).then(console.log);
