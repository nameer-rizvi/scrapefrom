const { isObject, isArray, isStringValid, trim } = require("simpul");
const cheerio = require("cheerio");
const stripHtml = require("string-strip-html").stripHtml;
const extractor = require("./util.extractor");
const mapKeys = require("./util.mapKeys");

async function extraction(configs) {
  let datas = configs.map((config) => {
    if (!config.error) {
      if (isObject(config.response) || isArray(config.response)) {
        config.result = config.extractor
          ? config.extractor(config.response)
          : isObject(config.keyMap)
          ? mapKeys(config.response, config.keyMap)
          : undefined;
      } else if (isStringValid(config.response)) {
        const $ = cheerio.load(config.response);

        config.result = config.extractor
          ? config.extractor($)
          : config.extract || config.extracts
          ? extractor({ ...config, $ })
          : {
              html_raw_full: config.response,
              html_raw_split: config.response
                .split("\n")
                .map(trim)
                .filter(Boolean),
              html_stripped_full: trim(stripHtml(config.response).result),
              html_stripped_split: stripHtml(config.response)
                .result.split("\n")
                .map(trim)
                .filter(Boolean),
            };
      }
    }

    if (!config.includeResponse) delete config.response;

    return config;
  });

  datas = datas.length === 1 ? datas[0] : datas;

  if (isObject(datas) && datas.error) {
    throw new Error(datas.error);
  } else return datas;
}

module.exports = extraction;
