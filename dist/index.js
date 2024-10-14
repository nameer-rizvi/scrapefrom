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
const simpul_1 = __importDefault(require("simpul"));
const getResponsesWithFetch_1 = __importDefault(require("./getResponsesWithFetch"));
const getResponsesWithPuppeteer_1 = __importDefault(require("./getResponsesWithPuppeteer"));
function scrapefrom(...inputs) {
    return __awaiter(this, void 0, void 0, function* () {
        // Configurize inputs
        const configs = [];
        for (const input of inputs) {
            if (typeof input === "string") {
                configs.push({ url: input });
            }
            else if (simpul_1.default.isObject(input)) {
                if (typeof input.url === "string")
                    configs.push(input);
            }
            else if (Array.isArray(input)) {
                for (const i of input) {
                    if (typeof i === "string") {
                        configs.push({ url: i });
                    }
                    else if (simpul_1.default.isObject(i)) {
                        if (typeof i.url === "string")
                            configs.push(i);
                    }
                }
            }
        }
        for (let i = 0; i < configs.length; i++) {
            if (typeof configs[i].index !== "number")
                configs[i].index = i;
        }
        // Get responses with fetch and/or puppeteer
        yield (0, getResponsesWithFetch_1.default)(configs);
        yield (0, getResponsesWithPuppeteer_1.default)(configs);
        console.log(configs);
        // Return results
        return {};
    });
}
module.exports = scrapefrom;
// import extractData from "./extractData";
// const results = await extractData(configs);
// return results;
