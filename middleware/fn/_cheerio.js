const cheerio = require("cheerio");

const { isStringEmpty, isObjectEmpty } = require("./validations");

module.exports = ({ html, container, text, attr }) => {
  const $ = cheerio.load(html);

  var collection = [];

  container &&
    $(container).each((index, child) => {
      const obj = {};

      text &&
        Object.keys(text).map(key => {
          obj[key] = $(child)
            .find(text[key])
            .text()
            .replace(/\s+/g, " ")
            .trim();
        });

      attr &&
        Object.keys(attr).map(key => {
          obj[key] = $(child)
            .find(attr[key].selector)
            .attr(attr[key].attr)
            .replace(/\s+/g, " ")
            .trim();
        });

      collection.push(obj);
    });

  return collection;
};
