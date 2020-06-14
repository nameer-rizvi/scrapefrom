const cheerio = require("cheerio");

const { isStringValid } = require("../validate/utils");

module.exports = (html, config) => {
  var data = [];

  const { type, mapper } = config;

  const $ = isStringValid(html) && cheerio.load(html);

  // scrapes specifically for structured data
  // see Schema.org and application/ld+json examples
  const scrapeForStructuredData = () =>
    $(`script[type="application/ld+json"]`).each((index, child) => {
      const innerJSON = $(child).html();
      data.push(JSON.parse(innerJSON));
    });

  scrapeForStructuredData();

  // only included structured data you are looking for
  if (type) {
    data = data.filter((element) => element["@type"] === type);
  }
  const mappedData = data.map((structuredData) => {
    let newDataObj = {};

    Object.keys(mapper).forEach((key) => {
      newDataObj[key] = structuredData[mapper[key]];
    });

    return newDataObj;
  });

  if (mapper) {
    return mappedData;
  }

  return data;
};
