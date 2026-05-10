import { type Config } from "./interfaces.js";
import * as utilN from "@nameer/utils";
import * as cheerio from "cheerio";
import extractDataWithKeyPath from "./3.extractDataWithKeyPath.js";
import extractHtmlData1 from "./3.extractHtmlData.1.js";
import extractHtmlData2 from "./3.extractHtmlData.2.js";

function extractDataFromResponses(configs: Config[]): void {
  for (const config of configs) {
    if (utilN.isObject(config.response) || utilN.isArray(config.response)) {
      if (utilN.isFunction(config.extractor)) {
        config.result = config.extractor(config.response);
      } else if (utilN.isObject(config.keyPath)) {
        config.result = extractDataWithKeyPath(config);
      }
    } else if (utilN.isString(config.response)) {
      const $ = cheerio.load(config.response);
      if (utilN.isFunction(config.extractor)) {
        config.result = config.extractor($, config.response);
      } else if (config.extract ?? config.extracts) {
        config.result = extractHtmlData1(config, $);
      } else {
        config.result = extractHtmlData2($);
      }
    }

    if (config.includeResponse !== true) delete config.response;

    if (config.includeTimeout !== true) delete config.timeout;
  }
}

export default extractDataFromResponses;
