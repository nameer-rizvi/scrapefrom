const scrapefrom = require("./index");
scrapefrom({
  url: "http://www.blackcatdc.com/schedule.html",
  defaultDelimiter: " ",
  extract: {
    selector: "div#main-calendar div.show",
    name: "events",
    extracts: [
      {
        name: "title",
        selector: "h1.headline",
      },
      {
        name: "title2",
        selector: "h2.support",
      },
      {
        name: "price",
        selector: "p.show-text",
      },
      {
        name: "time",
        selector: "p.show-text",
      },
      {
        name: "date",
        selector: "h2.date",
      },
      {
        name: "eventLink",
        selector: "h1.headline a",
        attribute: "href",
      },
      {
        name: "ticketLink",
        selector: "div.show-details>a",
        attribute: "href",
      },
    ],
  },
}).then(console.log);
