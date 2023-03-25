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

  if (extractConfigs.length && $)
    for (let i = 0; i < extractConfigs.length; i++) {
      let {
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

        for (let scriptType of ["application/ld+json", "application/json"])
          $(`script[type="${scriptType}"]`).each((index, child) => {
            let html = $(child).html();
            let json = simpul.parseJSON(html);
            if (!json) json = simpul.parseJSON(html.replace(/\\/g, ""));
            if (json) jsons.push(json);
          });

        jsons = jsons.flat();

        if (filter) {
          let jsons2 = [];
          for (let json of jsons) if (filter(json)) jsons2.push(json);
          jsons = jsons2;
        }

        if (keyPath) {
          let jsons2 = [];
          for (let json of jsons) jsons2.push(keyPathExtraction(keyPath, json));
          jsons = jsons2;
        }

        data[name || "json_" + i] = jsons;
      } else if (extract2 || extracts2) {
        let extractConfig = { extract: extract2, extracts: extracts2 };

        let datas = [];

        $(selector).each((index, child) => {
          let html = $(child).html();
          let xml = { decodeEntities: false };
          let htmlCheerio = cheerio.load(html, { xml });
          let props = { ...extractConfig, $: htmlCheerio, defaultDelimiter };
          datas.push(htmlExtraction2(props));
        });

        data[name || selector] = datas;
      } else if (selector) {
        let texts = [];

        $(selector).each((index, child) => {
          let text = attribute ? $(child).attr(attribute) : $(child).text();
          if (simpul.isStringValid(text)) texts.push(simpul.trim(text));
        });

        if (texts.length === 1) {
          texts = texts[0];
        } else if (delimiter !== undefined) {
          texts = delimiter ? texts.join(delimiter) : texts;
        } else if (defaultDelimiter) {
          texts = texts.join(defaultDelimiter);
        }

        data[name || selector] = texts;
      }
    }

  return data;
}

function getExtractConfigs(extract, extracts = []) {
  const extractConfigs = [];

  for (let extractConfig of [extract, ...extracts]) {
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
