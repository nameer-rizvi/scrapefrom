"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
require("cross-fetch/polyfill");
const _1_configurize_1 = __importDefault(require("./1.configurize"));
const _2_getResponsesWithFetch_1 = __importDefault(require("./2.getResponsesWithFetch"));
const _2_getResponsesWithPuppeteer_1 = __importDefault(require("./2.getResponsesWithPuppeteer"));
function scrapefrom(...inputs) {
    return __awaiter(this, void 0, void 0, function* () {
        const configs = (0, _1_configurize_1.default)(inputs);
        yield (0, _2_getResponsesWithFetch_1.default)(configs);
        yield (0, _2_getResponsesWithPuppeteer_1.default)(configs);
        return { url: "" };
        // const results = extractData(configs);
    });
}
module.exports = scrapefrom;
