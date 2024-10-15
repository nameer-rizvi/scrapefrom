const scrapefrom = require("../dist");
// console.log(scrapefrom);

scrapefrom({ url: "https://www.npmjs.com/package/dottpath", logFetch: true }, [
  [
    "https://www.npmjs.com/package/jsontxt",
    [
      "https://www.npmjs.com/package/scrapefrom",
      {
        url: "https://www.npmjs.com/package/simpul",
        use: "puppeteer",
        logFetch: true,
      },
    ],
  ],
]).then(console.log);
