import { Config } from "./interfaces";
import simpul from "simpul";
// import * as cheerio from "cheerio";
import extractDataFromResponsesWithKeyPath from "./3.extractDataFromResponsesWithKeyPath";

function extractDataFromResponses(configs: Config[]): Config | Config[] {
  const results: Config[] = [];

  for (const config of configs) {
    if (simpul.isObject(config.response) || Array.isArray(config.response)) {
      if (config.extractor) {
        config.result = config.extractor(config.response);
      } else if (simpul.isObject(config.keyPath)) {
        config.result = extractDataFromResponsesWithKeyPath(config);
      }
    } else if (typeof config.response === "string") {
      // const $ = cheerio.load(config.response);
      // if (config.extractor) {
      //   config.result = config.extractor($);
      // } else if (config.extract || config.extracts) {
      //   config.result = extractDataHTML1(config, $);
      // } else {
      //   config.result = extractDataHTML2(config);
      // }
    }

    if (config.includeResponse !== true) delete config.response;

    if (config.fetch?.signal) delete config.fetch.signal;

    delete config.timeout;

    results.push(config);
  }

  if (configs.length === 1) {
    if (results[0]?.error) throw new Error(results[0].error);

    return results[0];
  }

  return results;
}

export default extractDataFromResponses;
