"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dottpath_1 = __importDefault(require("dottpath"));
function extractDataFromResponsesWithKeyPath(config) {
    const result = {};
    for (const key in config.keyPath) {
        result[key] = dottpath_1.default.extract(config.response, config.keyPath[key]);
    }
    return result;
}
exports.default = extractDataFromResponsesWithKeyPath;
