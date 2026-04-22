import { type Config } from "./interfaces.js";
import * as utils from "@nameer/utils";
import * as cheerio from "cheerio";
import extractDataWithKeyPath from "./3.extractDataWithKeyPath.js";
import extractHTMLData1 from "./3.extractHTMLData.1.js";
import extractHTMLData2 from "./3.extractHTMLData.2.js";

function extractDataFromResponses(configs: Config[]): void {
  for (const config of configs) {
    if (utils.isObject(config.response) || utils.isArray(config.response)) {
      if (utils.isFunction(config.extractor)) {
        config.result = config.extractor(config.response);
      } else if (utils.isObject(config.keyPath)) {
        config.result = extractDataWithKeyPath(config);
      }
    } else if (utils.isString(config.response)) {
      const $ = cheerio.load(config.response);
      if (utils.isFunction(config.extractor)) {
        config.result = config.extractor($);
      } else if (config.extract ?? config.extracts) {
        config.result = extractHTMLData1(config, $);
      } else {
        config.result = extractHTMLData2($);
      }
    }

    if (config.includeResponse !== true) delete config.response;

    if (config.includeTimeout !== true) delete config.timeout;
  }
}

export default extractDataFromResponses;
