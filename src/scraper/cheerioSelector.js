const cheerio = require("cheerio");

const {
  isStringValid,
  isObjectValid,
  isString,
  isObject,
} = require("../validate/utils");

module.exports = (html, { container, text, attr }) => {
  var data = [];

  const $ = isStringValid(html) && cheerio.load(html);

  const scrapeHTML = () =>
    $(container).each((index, child) => {
      const _data = {};
      const scrapeText = () =>
        Object.keys(text).map((key) => {
          const findTextKey = isString(text[key])
            ? text[key]
            : isObject(text[key]) && isString(text[key].container)
            ? text[key].container
            : null;
          const asArray = isObject(text[key]) && text[key].asArray;
          const textContent =
            findTextKey &&
            $(child)
              .find(findTextKey)
              .contents()
              .toArray()
              .map((element) => cheerio(element).text())
              .filter(isStringValid);
          const textCleaner = (str) => str.replace(/\s+/g, " ").trim();
          textContent &&
            (_data[key] = asArray
              ? textContent.map((text, index) => textCleaner(text))
              : textCleaner(textContent.join(" ")));
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

// WIP, adding follow config for next round of scraping.
//
// const scrapeFollow = () => {
//   const followSelector =
//     follow && follow.api && follow.api.url && follow.api.url.selector;
//   const followAttr =
//     follow && follow.api && follow.api.url && follow.api.url.attr;
//   const findAndAddFollowURL = () => {
//     const followFind = $(child).find(followSelector);
//     const followContent = followFind && followFind.attr(followAttr);
//     followContent &&
//       (_data.follow = {
//         ...follow,
//         api: {
//           ...follow.api,
//           url: followContent.replace(/\s+/g, " ").trim(),
//         },
//       });
//   };
//   isStringValid(followSelector) &&
//     isStringValid(followAttr) &&
//     findAndAddFollowURL();
// };
