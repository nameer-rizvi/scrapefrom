const scrapefrom = require("../dist/cjs/index.js");

// scrapefrom("https://dcmusic.live/").then(console.log);

// scrapefrom({
//   url: "https://www.npmjs.com/package/scrapefrom",
//   extract: "h1",
// }).then(console.log);

// scrapefrom({
//   url: "https://www.npmjs.com/package/scrapefrom",
//   extract: { name: "titles", selector: "h1" },
// }).then(console.log);

// scrapefrom({
//   url: "https://www.npmjs.com/package/scrapefrom",
//   extract: { name: "title", selector: "h1", delimiter: "," },
// }).then(console.log);

// scrapefrom({
//   url: "https://www.npmjs.com/package/scrapefrom",
//   extract: {
//     name: "dates",
//     selector: "time",
//     attribute: "datetime",
//   },
// }).then(console.log);

// scrapefrom({
//   url: "https://www.npmjs.com/package/scrapefrom",
//   extracts: [
//     { name: "titles", selector: "h1" },
//     { name: "dates", selector: "time", attribute: "datetime" },
//   ],
// }).then(console.log);

// scrapefrom([
//   {
//     url: "https://www.npmjs.com/package/scrapefrom",
//     extracts: [
//       { name: "titles", selector: "h1" },
//       { name: "dates", selector: "time", attribute: "datetime" },
//     ],
//   },
//   {
//     url: "https://www.npmjs.com/package/async-fetch",
//     extracts: [
//       { name: "titles", selector: "h1" },
//       { name: "dates", selector: "time", attribute: "datetime" },
//     ],
//   },
// ]).then(console.log);

scrapefrom({
  url: "https://www.npmjs.com/package/async-fetch",
  use: "puppeteer",
  delimiter: "",
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
}).then(console.log);

// console.log({ cjs: scrapefrom });
