const simpul = require("simpul");
const cheerio = require("cheerio");
const keyPathExtraction = require("./3.extraction.keyPath");
const htmlExtraction1 = require("./3.extraction.html.1");
const htmlExtraction2 = require("./3.extraction.html.2");

async function extraction(configs) {
  let datas = [];

  for (let config of configs) {
    let $ =
      simpul.isStringValid(config.response) && cheerio.load(config.response);

    if (simpul.isObject(config.response) || simpul.isArray(config.response)) {
      if (config.extractor) {
        config.result = config.extractor(config.response);
      } else if (simpul.isObject(config.keyPath)) {
        config.result = keyPathExtraction(config.keyPath, config.response);
      }
    } else if (simpul.isStringValid(config.response)) {
      if (config.extractor) {
        config.result = config.extractor($);
      } else if (config.extract || config.extracts) {
        config.result = htmlExtraction2({ ...config, $ });
      } else {
        config.result = htmlExtraction1(config);
      }
    }

    if (!config.includeResponse) delete config.response;

    datas.push(config);
  }

  if (datas.length === 1) {
    if (simpul.isObject(datas[0]) && datas[0].error) {
      throw new Error(datas[0].error);
    } else return datas[0];
  } else return datas;
}

module.exports = extraction;
