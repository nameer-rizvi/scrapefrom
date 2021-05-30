const scrapefrom = require("./index");
scrapefrom({
  use: "puppeteer",
  //
  // Using json response parser...
  //
  // url: "https://api.dcmusic.live/event/list",
  // extractor: (data) => data.returnVenues,
  //
  // Using waitForSelector...
  //
  url: "https://citywinery.com/washingtondc/Online/default.asp?BOparam::WScontent::loadArticle::permalink=washingtondc-buy-tickets&BOparam::WScontent::loadArticle::context_id=",
  waitForSelector: ".result-box-item",
  extract: {
    selector: "div.result-box-item",
    name: "events",
    extracts: [
      { selector: "div.item-name", name: "title" },
      { selector: "span.start-date", name: "date" },
      { selector: "span.start-date", name: "time" },
      { selector: "div.item-venue", name: "status" },
      { selector: "div.item-name a", name: "eventLink", attribute: "href" },
    ],
  },
}).then(console.log);
