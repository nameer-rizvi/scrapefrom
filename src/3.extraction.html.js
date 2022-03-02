const {
  isString,
  isObject,
  isArray,
  isStringValid,
  parseJSON,
  trim,
} = require("simpul");
const keyPathExtraction = require("./3.extraction.keyPath");
const cheerio = require("cheerio");

const makeExtractConfig = (extract) =>
  isString(extract)
    ? { selector: extract }
    : isObject(extract) && (extract.selector || extract.json)
    ? extract
    : isArray(extract) && extract.map(makeExtractConfig);

const makeExtractConfigs = (extract, extracts = []) =>
  [extract, ...extracts]
    .map(makeExtractConfig)
    .flat(Infinity)
    .filter(Boolean);

function htmlExtraction({ extract, extracts, $, defaultDelimiter = " " }) {
  let data = {};

  extracts = makeExtractConfigs(extract, extracts);

  if (extracts.length && $)
    for (let i = 0; i < extracts.length; i++) {
      let {
        json: extractJSON,
        filter,
        keyPath,
        name,
        extract: extractList,
        extracts: extractsList,
        selector,
        attribute,
        delimiter,
      } = extracts[i];

      if (extractJSON) {
        let jsons = [];

        for (let scriptType of ["application/ld+json", "application/json"])
          $(`script[type="${scriptType}"]`).each((index, child) => {
            let html = $(child).html();
            jsons.push(parseJSON(html));
          });

        jsons = jsons.flat();

        if (filter) jsons = jsons.filter(filter);

        if (keyPath)
          jsons = jsons.map((json) => keyPathExtraction(keyPath, json));

        data[name || "json_" + i] = jsons;
      } else if (extractList || extractsList) {
        let extractConfig = { extract: extractList, extracts: extractsList };

        let list = [];

        $(selector).each((index, child) => {
          let html = $(child).html();
          let xml = { decodeEntities: false };
          let htmlCheerio = cheerio.load(html, { xml });
          let props = { ...extractConfig, $: htmlCheerio, defaultDelimiter };
          list.push(htmlExtraction(props));
        });

        data[name || selector] = list;
      } else if (selector) {
        let contents = [];

        $(selector).each((index, child) => {
          const content = attribute
            ? $(child).attr(attribute)
            : $(child).text();
          contents.push(content);
        });

        contents = contents.map((i) => trim(i)).filter(isStringValid);

        if (contents.length === 1) {
          contents = contents[0];
        } else if (delimiter) {
          contents = contents.join(delimiter);
        } else if (defaultDelimiter) contents = contents.join(defaultDelimiter);

        data[name || selector] = contents;
      }
    }

  return data;
}

module.exports = htmlExtraction;
