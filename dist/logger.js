"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const simpul_1 = __importDefault(require("simpul"));
function logger(isEnabled = false, processName, configName) {
    if (isEnabled !== true) {
        return simpul_1.default.noop;
    }
    const prefix = processName.slice(0, 3);
    return function log(message, method = "info") {
        console[method](`[scrapefrom:${prefix}] ${configName}: ${message}`);
    };
}
exports.default = logger;
