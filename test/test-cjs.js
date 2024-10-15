const scrapefrom = require("../dist");
// console.log(scrapefrom);

scrapefrom({
  url: "https://api.dcmusic.live/root?version=2.0.02",
  keyPath: { route1: "routes.0", route3: "routes.2" },
}).then(console.log);

// scrapefrom(
//   {
//     url: "https://www.npmjs.com/package/dottpath",
//     logFetch: true,
//     includeResponse: true,
//   },
//   [
//     [
//       "https://www.npmjs.com/package/jsontxt",
//       [
//         "https://www.npmjs.com/package/scrapefrom",
//         {
//           url: "https://www.npmjs.com/package/simpul",
//           use: "puppeteer",
//           logFetch: true,
//         },
//       ],
//     ],
//   ],
// );
