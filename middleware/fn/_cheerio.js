const cheerio = require("cheerio");

const { isStringEmpty, isObjectEmpty } = require("./validations");

module.exports = ({ html, container, text, attr }) => {
  var collection = [];

  const $ = !isStringEmpty(html) && cheerio.load(html);

  $ &&
    !isStringEmpty(container) &&
    $(container).each((index, child) => {
      const obj = {};

      !isObjectEmpty(text) &&
        Object.keys(text).map(key => {
          const textText = $(child)
            .find(text[key])
            .text();

          obj[key] = textText && textText.replace(/\s+/g, " ").trim();
        });

      !isObjectEmpty(attr) &&
        Object.keys(attr).map(key => {
          const el = attr[key];

          !isObjectEmpty(el) &&
            (() => {
              const attrFind = $(child).find(el.selector);
              const attrAttr = attrFind && attrFind.attr(el.attr);

              obj[key] = attrAttr && attrAttr.replace(/\s+/g, " ").trim();
            })();
        });

      collection.push(obj);
    });

  return collection;
};
