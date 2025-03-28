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
const simpul_1 = __importDefault(require("simpul"));
const cheerio = __importStar(require("cheerio"));
const _3_extractDataWithKeyPath_1 = __importDefault(require("./3.extractDataWithKeyPath"));
const _3_extractHTMLData_1_1 = __importDefault(require("./3.extractHTMLData.1"));
const _3_extractHTMLData_2_1 = __importDefault(require("./3.extractHTMLData.2"));
function extractDataFromResponses(configs) {
    var _a;
    const results = [];
    for (const config of configs) {
        if (simpul_1.default.isObject(config.response) || Array.isArray(config.response)) {
            if (config.extractor) {
                config.result = config.extractor(config.response);
            }
            else if (simpul_1.default.isObject(config.keyPath)) {
                config.result = (0, _3_extractDataWithKeyPath_1.default)(config);
            }
        }
        else if (typeof config.response === "string") {
            const $ = cheerio.load(config.response);
            if (config.extractor) {
                config.result = config.extractor($);
            }
            else if (config.extract || config.extracts) {
                config.result = (0, _3_extractHTMLData_1_1.default)(config, $);
            }
            else {
                config.result = (0, _3_extractHTMLData_2_1.default)(config);
            }
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
