const simpul = require("simpul");
const keyPathExtraction = require("./3.extraction.keyPath");
const cheerio = require("cheerio");

function htmlExtraction2({
  extract,
  extracts,
  $,
  delimiter: configDelimiter,
  defaultDelimiter = " ",
}) {
  const data = {};

  const extractConfigs = getExtractConfigs(extract, extracts);

  if (extractConfigs.length && $) {
    for (let i = 0; i < extractConfigs.length; i++) {
      const {
        json: extractJSON,
        filter,
        keyPath,
        name,
        extract: extract2,
        extracts: extracts2,
        selector,
        attribute,
        delimiter = configDelimiter,
      } = extractConfigs[i];

      if (extractJSON) {
        let jsons = [];

        for (let scriptType of ["application/ld+json", "application/json"]) {
          $(`script[type="${scriptType}"]`).each((_, child) => {
            const html = $(child).html();
            let json = simpul.parsejson(html);
            if (!json) json = simpul.parsejson(html.replace(/\\/g, ""));
            if (json) jsons.push(json);
          });
        }

        jsons = jsons.flat();

        if (filter) jsons = jsons.filter(filter);

        if (keyPath) {
          jsons = jsons.map((json) => keyPathExtraction(keyPath, json));
        }

        data[name || "json_" + i] = jsons;
      } else if (extract2 || extracts2) {
        const nestedConfig = { extract: extract2, extracts: extracts2 };

        const nestedData = [];

        $(selector).each((_, child) => {
          const html = $(child).html();
          const htmlCheerioOptions = { xml: { decodeEntities: false } };
          const htmlCheerio = cheerio.load(html, htmlCheerioOptions);
          const props = { ...nestedConfig, $: htmlCheerio, defaultDelimiter };
          nestedData.push(htmlExtraction2(props));
        });

        data[name || selector] = nestedData;
      } else if (selector) {
        let texts = [];

        $(selector).each((_, child) => {
          const text = attribute ? $(child).attr(attribute) : $(child).text();
          if (simpul.isStringValid(text)) texts.push(simpul.trim(text));
        });

        if (texts.length === 1) {
          texts = texts[0];
        } else if (delimiter !== undefined) {
          // "delimiter" can be null, which ensures the "defaultDelimiter" is not used.
          texts = delimiter ? texts.join(delimiter) : texts;
        } else if (defaultDelimiter) {
          texts = texts.join(defaultDelimiter);
        }

        data[name || selector] = texts;
      }
    }
  }

  return data;
}

function getExtractConfigs(extract, extracts = []) {
  const extractConfigs = [];
  for (const extractConfig of [extract, ...extracts]) {
    if (simpul.isString(extractConfig)) {
      extractConfigs.push({ selector: extract });
    } else if (simpul.isObject(extractConfig)) {
      if (extractConfig.selector || extractConfig.json)
        extractConfigs.push(extractConfig);
    } else if (simpul.isArray(extractConfig)) {
      extractConfigs.push(...getExtractConfigs(extractConfig));
    }
  }
  return extractConfigs.flat(Infinity);
}

module.exports = htmlExtraction2;
