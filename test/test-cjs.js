const scrapefrom = require("../dist");
// console.log(scrapefrom);

scrapefrom("https://www.npmjs.com/package/dottpath").then((res) =>
  console.log(res.result),
);

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
