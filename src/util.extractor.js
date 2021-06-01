const {
  isString,
  isObject,
  isArray,
  cleanSpace,
  isStringValid,
} = require("simpul");
const mapKeys = require("./util.mapKeys");
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

function extractor({ extract, extracts, $, defaultDelimiter }) {
  let data = {};

  extracts = makeExtractConfigs(extract, extracts);

  if (extracts.length && $)
    extracts.forEach(
      (
        {
          selector,
          json: extractJSON,
          filter,
          keyMap,
          extract: extractList,
          extracts: extractsList,
          attribute,
          delimiter = defaultDelimiter,
          name,
        },
        index
      ) => {
        if (extractJSON) {
          let jsons = [];

          ["application/ld+json", "application/json"].forEach((scriptType) =>
            $(`script[type="${scriptType}"]`).each((index, child) => {
              try {
                const html = $(child).html();
                const json = JSON.parse(html);
                jsons.push(json);
              } catch (error) {
                // ignore error
              }
            })
          );

          jsons = jsons.flat();

          if (filter) jsons = jsons.filter(filter);

          if (keyMap) jsons = jsons.map((json) => mapKeys(json, keyMap));

          data[name || "json_" + index] = jsons;
        } else if (extractList || extractsList) {
          const extractConfig = {
            extract: extractList,
            extracts: extractsList,
          };

          const list = [];

          $(selector).each((index, child) => {
            const html = $(child).html();
            const xml = { decodeEntities: false };
            const htmlCheerio = cheerio.load(html, { xml });
            const props = {
              ...extractConfig,
              $: htmlCheerio,
              defaultDelimiter,
            };
            list.push(extractor(props));
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

          contents = contents.map(cleanSpace).filter(isStringValid);

          if (contents.length === 1) {
            contents = contents[0];
          } else if (delimiter) contents = contents.join(delimiter);

          data[name || selector] = contents;
        }
      }
    );

  return data;
}

module.exports = extractor;
