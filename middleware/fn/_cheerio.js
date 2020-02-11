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

          textText && (obj[key] = textText.replace(/\s+/g, " ").trim());
        });

      !isObjectEmpty(attr) &&
        Object.keys(attr).map(key => {
          const el = attr[key];

          !isObjectEmpty(el) &&
            !isStringEmpty(el.selector) &&
            !isStringEmpty(el.attr) &&
            (() => {
              const attrFind = $(child).find(el.selector);
              const attrAttr = attrFind && attrFind.attr(el.attr);

              attrAttr && (obj[key] = attrAttr.replace(/\s+/g, " ").trim());
            })();
        });

      collection.push(obj);
    });

  collection = collection.filter(obj => {
    return !isObjectEmpty(obj);
  });

  return collection;
};
