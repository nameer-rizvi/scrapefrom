const scrapefrom = require("../dist");
// console.log(scrapefrom);

scrapefrom(
  "https://www.npmjs.com/package/scrapefrom",
  {
    url: "https://www.npmjs.com/package/sanitized",
    logFetch: true,
  },
  {
    url: "https://www.npmjs.com/package/simpul",
    use: "puppeteer",
    logFetch: true,
  },
)
  .then(console.log)
  .catch(console.log);
// scrapefrom({
//   url: "https://www.npmjs.com/package/async-fetch",
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
// }).then((r) => console.log(r.result.rows));
