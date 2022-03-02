const { isStringValid, isObject, isArray, trim } = require("simpul");
const cheerio = require("cheerio");
const { stripHtml } = require("string-strip-html");
const keyPathExtraction = require("./3.extraction.keyPath");
const htmlExtraction = require("./3.extraction.html");

async function extraction(configs) {
  let datas = [];

  for (let config of configs) {
    let $ = isStringValid(config.response) && cheerio.load(config.response);

    config.result =
      isObject(config.response) || isArray(config.response)
        ? config.extractor
          ? config.extractor(config.response)
          : isObject(config.keyPath)
          ? keyPathExtraction(config.keyPath, config.response)
          : undefined
        : isStringValid(config.response)
        ? config.extractor
          ? config.extractor($)
          : config.extract || config.extracts
          ? htmlExtraction({ ...config, $ })
          : {
              html_raw_full: config.response,
              html_raw_split: config.response
                .split("\n")
                .map((i) => trim(i))
                .filter(Boolean),
              html_stripped_full: trim(stripHtml(config.response).result),
              html_stripped_split: stripHtml(config.response)
                .result.split("\n")
                .map((i) => trim(i))
                .filter(Boolean),
            }
        : undefined;

    if (!config.includeResponse) delete config.response;

    datas.push(config);
  }

  if (datas.length === 1) {
    if (isObject(datas[0]) && datas[0].error) {
      throw new Error(datas[0].error);
    } else return datas[0];
  } else return datas;
}

module.exports = extraction;
