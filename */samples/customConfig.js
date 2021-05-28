module.exports = {
  api: "https://www.npmjs.com/package/scrapefrom",
  customParser: ($) => $("h1").text(),
};
