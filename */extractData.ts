import { Config } from "./interfaces";
import simpul from "simpul";
import * as cheerio from "cheerio";
import extractDataKeyPath from "./extractDataKeyPath";
import extractDataHTML1 from "./extractDataHTML.1";
import extractDataHTML2 from "./extractDataHTML.2";

function extractData(configs: Config[]): Config | Config[] {
  const results: Config[] = [];

  for (const config of configs) {
    if (simpul.isObject(config.response) || Array.isArray(config.response)) {
      if (config.extractor) {
        config.result = config.extractor(config.response);
      } else if (simpul.isObject(config.keyPath)) {
        config.result = extractDataKeyPath(config);
      }
    } else if (typeof config.response === "string") {
      const $ = cheerio.load(config.response);
      if (config.extractor) {
        config.result = config.extractor($);
      } else if (config.extract || config.extracts) {
        config.result = extractDataHTML1(config, $);
      } else {
        config.result = extractDataHTML2(config);
      }
    }

    if (config.includeResponse !== true) delete config.response;

    delete config.timeout;

    results.push(config);
  }

  if (configs.length === 1) {
    if (results[0]?.error) throw new Error(results[0].error);

    return results[0];
  }

  return results;
}

export default extractData;
