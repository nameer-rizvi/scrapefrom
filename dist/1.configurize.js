"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const simpul_1 = __importDefault(require("simpul"));
function configurize(input) {
    if (typeof input === "string") {
        return [{ index: 0, url: input }];
    }
    else if (simpul_1.default.isObject(input)) {
        return [Object.assign({ index: 0 }, input)];
    }
    else if (Array.isArray(input)) {
        const configs = [];
        for (const i of input) {
            // ...
        }
        return configs;
    }
    else {
        return [];
    }
}
exports.default = configurize;
