"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const simpul_1 = __importDefault(require("simpul"));
// import * as cheerio from "cheerio";
const _3_extractDataFromResponsesWithKeyPath_1 = __importDefault(require("./3.extractDataFromResponsesWithKeyPath"));
function extractDataFromResponses(configs) {
    var _a, _b;
    const results = [];
    for (const config of configs) {
        if (simpul_1.default.isObject(config.response) || Array.isArray(config.response)) {
            if (config.extractor) {
                config.result = config.extractor(config.response);
            }
            else if (simpul_1.default.isObject(config.keyPath)) {
                config.result = (0, _3_extractDataFromResponsesWithKeyPath_1.default)(config);
            }
        }
        else if (typeof config.response === "string") {
            // const $ = cheerio.load(config.response);
            // if (config.extractor) {
            //   config.result = config.extractor($);
            // } else if (config.extract || config.extracts) {
            //   config.result = extractDataHTML1(config, $);
            // } else {
            //   config.result = extractDataHTML2(config);
            // }
        }
        if (config.includeResponse !== true)
            delete config.response;
        if ((_a = config.fetch) === null || _a === void 0 ? void 0 : _a.signal)
            delete config.fetch.signal;
        delete config.timeout;
        results.push(config);
    }
    if (configs.length === 1) {
        if ((_b = results[0]) === null || _b === void 0 ? void 0 : _b.error)
            throw new Error(results[0].error);
        return results[0];
    }
    return results;
}
exports.default = extractDataFromResponses;
