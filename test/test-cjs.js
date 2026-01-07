const scrapefrom = require("../dist");
// console.log(scrapefrom);

// TODO
// - Add `extract` option at the `extract.config` level which passes the cheerio `$` to allow custom extraction.
// - Allow config to parse properties of parent selector.

// TODO: revisit after scrapefrom update to allow parsing attribute at root level.
// const configVenuesWalterreedScraper = {
//   url: "https://theparksdc.com/events/",
//   delimiter: " ",
//   extract: {
//     selector: "a[data-comp='event'][data-category*='music']",
//     name: "events",
//     extracts: [
//       {
//         name: "title",
//         selector: "h3",
//       },
//       {
//         name: "description",
//         selector: "p",
//         delimiter: simpul.delimiter,
//       },
//       {
//         name: "date",
//         attribute: "data-date",
//       },
//       {
//         name: "time",
//         selector: "time",
//       },
//       {
//         name: "eventLink",
//         selector: "a",
//         attribute: "href",
//       },
//       {
//         name: "imgSrc",
//         selector: "img",
//         attribute: "src",
//       },
//     ],
//   },
// };

// module.exports = configVenuesWalterreedScraper;

scrapefrom([
  {
    url: "https://jsonplaceholder.typicode.com/todos/1",
    log: true,
    extractor: ($) => {
      console.log($);
      return { test: 1 };
    },
  },
  // {
  //   url: "https://www.npmjs.com/package/scrapefrom",
  //   use: "puppeteer",
  //   logFetch: true,
  //   extracts: [
  //     { name: "titles", selector: "h1" },
  //     { name: "dates", selector: "time", attribute: "datetime" },
  //   ],
  // },
  // {
  //   url: "https://www.npmjs.com/package/async-fetch",
  //   use: "puppeteer",
  //   logFetch: true,
  //   extracts: [
  //     { name: "titles", selector: "h1" },
  //     { name: "dates", selector: "time", attribute: "datetime" },
  //   ],
  // },
]).then((res) => console.log(res));
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
