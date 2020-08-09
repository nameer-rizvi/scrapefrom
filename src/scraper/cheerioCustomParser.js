const cheerio = require("cheerio");
const { isStringValid } = require("../validate/utils");

module.exports = (html, customParser) => {
  const $ = isStringValid(html) && cheerio.load(html);
  return customParser($);
};
