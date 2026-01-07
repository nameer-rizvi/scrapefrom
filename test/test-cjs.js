const scrapefrom = require("../dist");
// console.log(scrapefrom);

scrapefrom({
  url: "https://google.com",
  log: true,
}).then((res) => console.log(res.result));
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
