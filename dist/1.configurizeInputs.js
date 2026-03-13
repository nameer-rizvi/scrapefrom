"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const simpul_1 = __importDefault(require("simpul"));
function configurizeInputs(...inputs) {
    const configs = [];
    let index = 0;
    for (const input of inputs) {
        if (simpul_1.default.isString(input)) {
            configs.push({ url: input });
        }
        else if (simpul_1.default.isArray(input)) {
            configs.push(...configurizeInputs(...input));
        }
        else if (isConfig(input)) {
            configs.push(Object.assign({ index }, input));
            index++;
        }
    }
    return configs;
}
function isConfig(input) {
    if (!simpul_1.default.isObject(input))
        return false;
    const url = input.url;
    return simpul_1.default.isURLString(url) || simpul_1.default.isURL(url);
}
exports.default = configurizeInputs;
