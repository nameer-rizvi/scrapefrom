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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio = __importStar(require("cheerio"));
const simpul_1 = __importDefault(require("simpul"));
function extractHTMLData1(config, $, parent) {
    const result = {};
    const extractConfigs = getExtractConfigs(config.extract, config.extracts);
    for (let i = 0; i < extractConfigs.length; i++) {
        const { name: explicitName, delimiter: localDelimiter, selector, attribute, json: extractJSON, extract: extractChild, extracts: extractChildren, extractor: extractCustom,
        // filter: jsonFilter,
        // keyPath: jsonKeyPath,
         } = extractConfigs[i];
        let name, delimiter;
        if (simpul_1.default.isString(explicitName)) {
            name = explicitName;
        }
        else if (simpul_1.default.isString(selector)) {
            name = [selector, attribute].filter(Boolean).join("_");
        }
        else {
            name = i.toString();
        }
        if (simpul_1.default.isString(localDelimiter)) {
            delimiter = localDelimiter;
        }
        else if (localDelimiter === null) {
            delimiter = null; // To override parent delimiter
        }
        else if (simpul_1.default.isString(config.delimiter)) {
            delimiter = config.delimiter;
        }
        else if (config.delimiter === null) {
            delimiter = null;
        }
        if (extractJSON === true) {
            console.log("\n--> 1\n");
            // let array: any[] = [];
            // for (const scriptType of ["application/ld+json", "application/json"]) {
            //   $(`script[type="${scriptType}"]`).each((_, child) => {
            //     const html = $(child).html() || "";
            //     let json = simpul.parseJson(html);
            //     if (!json) json = simpul.parseJson(html.replace(/\\/g, ""));
            //     if (json) array.push(json);
            //   });
            // }
            // array = array.flat();
            // if (jsonFilter) array = array.filter(jsonFilter);
            // if (jsonKeyPath) {
            //   array = array.map((response) => {
            //     return extractDataWithKeyPath({ response, keyPath: jsonKeyPath });
            //   });
            // }
            // result[name] = array;
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
                const $$ = cheerio.load(html, { xml: { decodeEntities: false } });
                array.push(extractHTMLData1(nestedConfig, $$, $(child)));
            });
            result[name] = array;
        }
        else if (extractCustom) {
            result[name] = extractCustom($, parent);
        }
        else if (selector) {
            const array = [];
            $(selector).each((_, child) => {
                const text = attribute ? $(child).attr(attribute) : $(child).text();
                const item = simpul_1.default.trim(text);
                if (simpul_1.default.isStringNonEmpty(item))
                    array.push(item);
            });
            if (simpul_1.default.isString(delimiter)) {
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
        if (simpul_1.default.isString(extractConfig)) {
            extractConfigs.push({ selector: extractConfig });
        }
        else if (simpul_1.default.isArray(extractConfig)) {
            extractConfigs.push(...getExtractConfigs(...extractConfig));
        }
        else if (simpul_1.default.isObject(extractConfig)) {
            const isValid = simpul_1.default.isString(extractConfig.selector) ||
                simpul_1.default.isFunction(extractConfig.extractor) ||
                extractConfig.json === true;
            if (isValid)
                extractConfigs.push(extractConfig);
        }
    }
    return extractConfigs;
}
exports.default = extractHTMLData1;
