const cheerio = require("cheerio");

const { isStringValid, isObjectValid } = require("../validate/utils");

module.exports = (html, container, text, attr) => {
  var data = [];

  const $ = isStringValid(html) && cheerio.load(html);

  const scrapeHTML = () =>
    $(container).each((index, child) => {
      const _data = {};
      const scrapeText = () =>
        Object.keys(text).map((key) => {
          const textContent = $(child)
            .find(text[key])
            .contents()
            .toArray()
            .map((element) => cheerio(element).text())
            .filter(isStringValid)
            .join(" ");
          textContent && (_data[key] = textContent.replace(/\s+/g, " ").trim());
        });
      const scrapeAttr = () =>
        Object.keys(attr).map((key) => {
          const el = attr[key];
          const findAndAddAttr = () => {
            const attrFind = $(child).find(el.selector);
            const attrContent = attrFind && attrFind.attr(el.attr);
            attrContent &&
              (_data[key] = attrContent.replace(/\s+/g, " ").trim());
          };
          isObjectValid(el) &&
            isStringValid(el.selector) &&
            isStringValid(el.attr) &&
            findAndAddAttr();
        });
      isObjectValid(text) && scrapeText();
      isObjectValid(attr) && scrapeAttr();
      data.push(_data);
    });

  $ && isStringValid(container) && scrapeHTML();

  data = data.filter(isObjectValid);

  return data;
};
