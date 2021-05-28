const scrapefrom = require("./index");

// scrapefrom({
//   url: "https://api.dcmusic.live/app/initialize",
//   keyMap: { metro: "metrolines.0.stops.2", metro2: "metrolines.1.stops.4" },
// })
//   .then(console.log)
//   .catch(console.log);
//
// scrapefrom({ url: "https://www.npmjs.com/package/scrapefrom", extract: "h1" })
//   .then(console.log)
//   .catch(console.log);
//
// scrapefrom({
//   url: "https://www.npmjs.com/package/async-fetch",
//   extracts: [
//     "h1",
//     { name: "npm_date", selector: "time", attribute: "datetime" },
//     {
//       selector: "tbody tr",
//       name: "rows",
//       extracts: [
//         { selector: "td:nth-child(1)", name: "key" },
//         { selector: "td:nth-child(2)", name: "type" },
//         { selector: "td:nth-child(3)", name: "definition" },
//         { selector: "td:nth-child(4)", name: "default", delimiter: " " },
//       ],
//     },
//   ],
// })
//   .then((data) => console.log(data))
//   .catch(console.log);
//
// scrapefrom("asdfadfs")
//   .then(console.log)
//   .catch(console.log);
//
scrapefrom({
  url: "https://dcmusic.live/",
  extracts: [
    {
      json: true,
      filter: (json) => json["@type"] === "Organization",
      keyMap: { site_logo: "logo" },
    },
  ],
})
  .then(console.log)
  .catch(console.log);
