"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio = __importStar(require("cheerio"));
const simpul_1 = __importDefault(require("simpul"));
const _3_extractDataWithKeyPath_1 = __importDefault(require("./3.extractDataWithKeyPath"));
function extractHTMLData1(config, $) {
    const result = {};
    const extractConfigs = getExtractConfigs(config.extract, config.extracts);
    if (!extractConfigs.length)
        return result;
    for (let i = 0; i < extractConfigs.length; i++) {
        const _a = extractConfigs[i], { json: extractJSON, extract: extractChild, extracts: extractChildren, selector, attribute, filter: jsonFilter, keyPath: jsonKeyPath } = _a, extractConfig = __rest(_a, ["json", "extract", "extracts", "selector", "attribute", "filter", "keyPath"]);
        let name, delimiter;
        if (typeof extractConfig.name === "string") {
            name = extractConfig.name;
        }
        else if (typeof selector === "string") {
            name = [selector, attribute].filter(Boolean).join("_");
        }
        else {
            name = i.toString();
        }
        if (typeof extractConfig.delimiter === "string") {
            delimiter = extractConfig.delimiter;
        }
        else if (extractConfig.delimiter === null) {
            delimiter = null; // To prevent use of parent config.delimiter.
        }
        else if (typeof config.delimiter === "string") {
            delimiter = config.delimiter;
        }
        else if (config.delimiter === null) {
            delimiter = null;
        }
        if (extractJSON === true) {
            let array = [];
            for (const scriptType of ["application/ld+json", "application/json"]) {
                $(`script[type="${scriptType}"]`).each((_, child) => {
                    const html = $(child).html() || "";
                    let json = simpul_1.default.parsejson(html);
                    if (!json)
                        json = simpul_1.default.parsejson(html.replace(/\\/g, ""));
                    if (json)
                        array.push(json);
                });
            }
            array = array.flat();
            if (jsonFilter)
                array = array.filter(jsonFilter);
            if (jsonKeyPath) {
                array = array.map((response) => (0, _3_extractDataWithKeyPath_1.default)({ response, keyPath: jsonKeyPath }));
            }
            result[name] = array;
        }
        else if (extractChild || extractChildren) {
            const nestedConfig = {
                extract: extractChild,
                extracts: extractChildren,
                delimiter,
            };
            const array = [];
            $(selector).each((_, child) => {
                const html = $(child).html() || "";
                const htmlCheerioOptions = { xml: { decodeEntities: false } };
                const htmlCheerio = cheerio.load(html, htmlCheerioOptions);
                array.push(extractHTMLData1(nestedConfig, htmlCheerio));
            });
            result[name] = array;
        }
        else if (selector) {
            const array = [];
            $(selector).each((_, child) => {
                const text = attribute ? $(child).attr(attribute) : $(child).text();
                const item = simpul_1.default.trim(text || "");
                if (typeof item === "string" && item.length)
                    array.push(item);
            });
            if (typeof delimiter === "string") {
                result[name] = array.join(delimiter);
            }
            else {
                result[name] = array;
            }
        }
    }
    return result;
}
function getExtractConfigs(extract, extracts = []) {
    const extractConfigs = [];
    for (const extractConfig of [extract, ...extracts]) {
        if (typeof extractConfig === "string") {
            extractConfigs.push({ selector: extractConfig });
        }
        else if (Array.isArray(extractConfig)) {
            extractConfigs.push(...getExtractConfigs(...extractConfig));
        }
        else if (extractConfig && simpul_1.default.isObject(extractConfig)) {
            const isValid = typeof extractConfig.selector === "string" ||
                extractConfig.json === true;
            if (isValid)
                extractConfigs.push(extractConfig);
        }
    }
    return extractConfigs;
}
exports.default = extractHTMLData1;
