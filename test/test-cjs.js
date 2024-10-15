const scrapefrom = require("../dist");
// console.log(scrapefrom);

scrapefrom("https://www.npmjs.com/package/dottpath", [
  [
    "https://www.npmjs.com/package/jsontxt",
    [
      "https://www.npmjs.com/package/scrapefrom",
      "https://www.npmjs.com/package/simpul",
    ],
  ],
]).then(console.log);
