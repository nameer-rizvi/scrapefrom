const scrapefrom = require("../dist");
// console.log(scrapefrom);

// TODO
// - Add `extract` option at the `extract.config` level which passes the cheerio `$` to allow custom extraction.
// - Allow config to parse properties of root selector.

const scrapers = [
  { url: "https://google.com" },
  // {
  //   url: "https://github.com/nameer-rizvi/scrapefrom",
  //   logFetch: true,
  //   extract: "h1",
  // },
  // {
  //   url: "https://github.com/nameer-rizvi/scrapefrom",
  //   logFetch: true,
  //   use: "puppeteer",
  //   extract: { name: "titles", selector: "h1" },
  // },
  // {
  //   url: "https://jsonplaceholder.typicode.com/todos/1",
  //   logFetch: true,
  //   keyPath: {
  //     user_id: "userId",
  //   },
  // },
];

scrapefrom(scrapers).then((res) => {
  console.log(res);
});

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

// scrapefrom({
//   url: "https://www.npmjs.com/package/async-fetch",
//   delimiter: "",
//   extract: {
//     selector: "tbody tr",
//     name: "rows",
//     extracts: [
//       { selector: "td:nth-child(1)", name: "key" },
//       { selector: "td:nth-child(2)", name: "type" },
//       { selector: "td:nth-child(3)", name: "definition" },
//       { selector: "td:nth-child(4)", name: "default" },
//     ],
//   },
// }).then(console.log);
