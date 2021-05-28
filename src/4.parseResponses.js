const cheerio = require("cheerio");
const { isStringValid, isObject, cleanSpace } = require("simpul");
const { stripHtml } = require("string-strip-html");
const mapKeys = require("./util.mapKeys");
const extractor = require("./util.extractor");

const parseResponses = (configs) =>
  new Promise((resolve, reject) => {
    let datas = configs.map((config) => {
      if (config.error) return { error: config.error };

      if (isObject(config.response)) {
        if (config.extractor) return config.extractor(config.response);

        if (isObject(config.keyMap))
          return mapKeys(config.response, config.keyMap);

        return config.response;
      }

      if (isStringValid(config.response)) {
        const $ = cheerio.load(config.response);

        if (config.extractor) return config.extractor($);

        if (config.extract || config.extracts)
          return extractor({ ...config, $ });

        if (config.htmlOnly)
          return {
            html_raw_full: config.response,
            html_raw_split: config.response
              .split("\n")
              .map(cleanSpace)
              .filter(Boolean),
            html_stripped_full: cleanSpace(stripHtml(config.response).result),
            html_stripped_split: stripHtml(config.response)
              .result.split("\n")
              .map(cleanSpace)
              .filter(Boolean),
          };
      }
    });

    datas = datas.length === 1 ? datas[0] : datas;

    if (isObject(datas) && datas.error) {
      reject(datas.error);
    } else resolve(datas);
  });

module.exports = parseResponses;
