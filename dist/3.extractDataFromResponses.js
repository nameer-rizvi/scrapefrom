"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const simpul_1 = __importDefault(require("simpul"));
// import * as cheerio from "cheerio";
const _3_extractDataWithKeyPath_1 = __importDefault(require("./3.extractDataWithKeyPath"));
// import extractHTMLData1 from "./3.extractHTMLData.1";
// import extractHTMLData2 from "./3.extractHTMLData.2";
function extractDataFromResponses(configs) {
    var _a;
    const results = [];
    for (const config of configs) {
        if (simpul_1.default.isObject(config.response) || simpul_1.default.isArray(config.response)) {
            if (config.extractor) {
                config.result = config.extractor(config.response);
            }
            else if (simpul_1.default.isObject(config.keyPath)) {
                config.response = { userId: [{ value: 123 }] };
                config.result = (0, _3_extractDataWithKeyPath_1.default)(config);
            }
        }
        else if (simpul_1.default.isString(config.response)) {
            // const $ = cheerio.load(config.response);
            // if (config.extractor) {
            //   config.result = config.extractor($);
            // } else if (config.extract || config.extracts) {
            //   config.result = extractHTMLData1(config, $);
            // } else {
            //   config.result = extractHTMLData2(config);
            // }
        }
        if (config.includeResponse !== true)
            delete config.response;
        results.push(config);
    }
    if (configs.length === 1) {
        if ((_a = results[0]) === null || _a === void 0 ? void 0 : _a.error)
            throw new Error(results[0].error);
        return results[0];
    }
    return results;
}
exports.default = extractDataFromResponses;
