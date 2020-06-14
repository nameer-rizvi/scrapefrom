const cheerio = require("cheerio");
const { isStringValid } = require("../validate/utils");

module.exports = (html, { type, mapper }) => {
  var data = [];
  const $ = isStringValid(html) && cheerio.load(html);
  // Scrapes specifically for structured data
  // see Schema.org and application/ld+json examples
  $(`script[type="application/ld+json"]`).each((index, child) =>
    data.push(JSON.parse($(child).html()))
  );
  // Only included structured data you are looking for
  type && (data = data.filter((element) => element["@type"] === type));
  return mapper
    ? data.map((structuredData) => {
        var newDataObj = {};
        Object.keys(mapper).forEach(
          (key) => (newDataObj[key] = structuredData[mapper[key]])
        );
        return newDataObj;
      })
    : data;
};
