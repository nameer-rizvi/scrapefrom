const cheerio = require("cheerio");

const { isStringEmpty, isObjectEmpty } = require("../validate/utils");

module.exports = (html, container, text, attr) => {
  var data = [];

  const $ = !isStringEmpty(html) && cheerio.load(html);

  const scrapeHTML = () =>
    $(container).each((index, child) => {
      const obj = {};
      const scrapeText = () =>
        Object.keys(text).map((key) => {
          const textContent = $(child)
            .find(text[key])
            .text();
          textContent && (obj[key] = textContent.replace(/\s+/g, " ").trim());
        });
      const scrapeAttr = () =>
        Object.keys(attr).map((key) => {
          const el = attr[key];
          const findAndAddAttr = () => {
            const attrFind = $(child).find(el.selector);
            const attrContent = attrFind && attrFind.attr(el.attr);
            attrContent && (obj[key] = attrContent.replace(/\s+/g, " ").trim());
          };
          !isObjectEmpty(el) &&
            !isStringEmpty(el.selector) &&
            !isStringEmpty(el.attr) &&
            findAndAddAttr();
        });
      !isObjectEmpty(text) && scrapeText();
      !isObjectEmpty(attr) && scrapeAttr();
      data.push(obj);
    });

  $ && !isStringEmpty(container) && scrapeHTML();

  data = data.filter((i) => !isObjectEmpty(i));

  return data;
};
