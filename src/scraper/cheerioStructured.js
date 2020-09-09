const cheerio = require("cheerio");
const { isStringValid } = require("../validate/utils");

module.exports = (html, { type, mapper }) => {
  let jsons = [];

  const $ = isStringValid(html) && cheerio.load(html);

  $(`script[type="application/ld+json"]`).each((index, child) =>
    jsons.push(JSON.parse($(child).html()))
  );

  type && (jsons = jsons.flat().filter((element) => element["@type"] === type));

  return mapper
    ? jsons.map((json) =>
        Object.keys(mapper).reduce((object, mapperKey) => {
          const splitMapperKeys = mapper[mapperKey].split(".");
          object[mapperKey] = splitMapperKeys.reduce(
            (_value, splitMapperKey) =>
              (_value =
                json[splitMapperKey] || _value[splitMapperKey] || _value),
            ""
          );
          return object;
        }, {})
      )
    : jsons;
};
