import { Config } from "./interfaces";
import simpul from "simpul";
import * as cheerio from "cheerio";
import extractDataWithKeyPath from "./3.extractDataWithKeyPath";
// import extractHTMLData1 from "./3.extractHTMLData.1";
import extractHTMLData2 from "./3.extractHTMLData.2";

function extractDataFromResponses(configs: Config[]): Config | Config[] {
  const results: Config[] = [];

  for (const config of configs) {
    if (simpul.isObject(config.response) || simpul.isArray(config.response)) {
      if (simpul.isFunction(config.extractor)) {
        config.result = config.extractor(config.response);
      } else if (simpul.isObject(config.keyPath)) {
        config.result = extractDataWithKeyPath(config);
      }
    } else if (simpul.isString(config.response)) {
      if (config.extractor) {
        config.result = config.extractor(cheerio.load(config.response));
      } else if (config.extract || config.extracts) {
        // config.result = extractHTMLData1(config, cheerio.load(config.response));
      } else {
        config.result = extractHTMLData2(config);
      }
    }

    if (config.includeResponse !== true) delete config.response;

    if (config.includeTimeout !== true) delete config.timeout;

    results.push(config);
  }

  if (configs.length === 1) {
    if (results[0]?.error) throw new Error(results[0].error);
    return results[0];
  }

  return results;
}

export default extractDataFromResponses;
