"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function extractDataFromResponses(configs) {
    for (const config of configs) {
        // if (simpul.isObject(config.response) || simpul.isArray(config.response)) {
        //   if (simpul.isFunction(config.extractor)) {
        //     config.result = config.extractor(config.response);
        //   } else if (simpul.isObject(config.keyPath)) {
        //     config.result = extractDataWithKeyPath(config);
        //   }
        // } else if (simpul.isString(config.response)) {
        //   const $ = cheerio.load(config.response);
        //   if (config.extractor) {
        //     config.result = config.extractor($);
        //   } else if (config.extract || config.extracts) {
        //     config.result = extractHTMLData1(config, $);
        //   } else {
        //     config.result = extractHTMLData2($);
        //   }
        // }
        // if (config.includeResponse !== true) delete config.response;
        // if (config.includeTimeout !== true) delete config.timeout;
    }
}
exports.default = extractDataFromResponses;
