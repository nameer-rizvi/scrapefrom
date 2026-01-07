"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const simpul_1 = __importDefault(require("simpul"));
function extractHTMLData1(config, $) {
    const result = {};
    // const extractConfigs = getExtractConfigs(config.extract, config.extracts);
    // for (let i = 0; i < extractConfigs.length; i++) {
    //   const {
    //     name: explicitName,
    //     delimiter: localDelimiter,
    //     selector,
    //     attribute,
    //     json: extractJSON,
    //     extract: extractChild,
    //     extracts: extractChildren,
    //     extractor,
    //     filter: jsonFilter,
    //     keyPath: jsonKeyPath,
    //   } = extractConfigs[i];
    //   let name, delimiter;
    //   if (simpul.isString(explicitName)) {
    //     name = explicitName;
    //   } else if (simpul.isString(selector)) {
    //     name = [selector, attribute].filter(Boolean).join("_");
    //   } else {
    //     name = i.toString();
    //   }
    //   if (simpul.isString(localDelimiter)) {
    //     delimiter = localDelimiter;
    //   } else if (localDelimiter === null) {
    //     delimiter = null; // To prevent use of parent config.delimiter.
    //   } else if (simpul.isString(config.delimiter)) {
    //     delimiter = config.delimiter;
    //   } else if (config.delimiter === null) {
    //     delimiter = null;
    //   }
    //   if (extractJSON === true) {
    //     let array: any[] = [];
    //     for (const scriptType of ["application/ld+json", "application/json"]) {
    //       $(`script[type="${scriptType}"]`).each((_, child) => {
    //         const html = $(child).html() || "";
    //         let json = simpul.parseJson(html);
    //         if (!json) json = simpul.parseJson(html.replace(/\\/g, ""));
    //         if (json) array.push(json);
    //       });
    //     }
    //     array = array.flat();
    //     if (jsonFilter) array = array.filter(jsonFilter);
    //     if (jsonKeyPath) {
    //       array = array.map((response) => {
    //         return extractDataWithKeyPath({ response, keyPath: jsonKeyPath });
    //       });
    //     }
    //     result[name] = array;
    //   } else if (extractChild || extractChildren) {
    //     const nestedConfig: Partial<Config> = {
    //       extract: extractChild,
    //       extracts: extractChildren,
    //       delimiter,
    //     };
    //     const array: any[] = [];
    //     $(selector).each((_, child) => {
    //       const html = $(child).html() || "";
    //       const $$ = cheerio.load(html, { xml: { decodeEntities: false } });
    //       array.push(extractHTMLData1(nestedConfig, $$));
    //     });
    //     result[name] = array;
    //   } else if (extractor) {
    //     result[name] = extractor($);
    //   } else if (selector) {
    //     const array: string[] = [];
    //     $(selector).each((_, child) => {
    //       const text = attribute ? $(child).attr(attribute) : $(child).text();
    //       const item = simpul.trim(text);
    //       if (simpul.isStringNonEmpty(item)) array.push(item);
    //     });
    //     if (simpul.isString(delimiter)) {
    //       result[name] = array.join(delimiter);
    //     } else {
    //       result[name] = array;
    //     }
    //   }
    // }
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
            const isValid = simpul_1.default.isString(extractConfig.selector) || extractConfig.json === true;
            if (isValid)
                extractConfigs.push(extractConfig);
        }
    }
    return extractConfigs;
}
exports.default = extractHTMLData1;
