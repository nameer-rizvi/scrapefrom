"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const simpul_1 = __importDefault(require("simpul"));
function configurizeInputs(...inputs) {
    const configs = [];
    for (const input of inputs) {
        if (simpul_1.default.isString(input)) {
            configs.push({ url: input });
        }
        else if (simpul_1.default.isArray(input)) {
            configs.push(...configurizeInputs(...input));
        }
        else if (isConfig(input)) {
            configs.push(input);
        }
    }
    for (let i = 0; i < configs.length; i++) {
        configs[i].index = i;
    }
    return configs;
}
function isConfig(input) {
    return simpul_1.default.isObject(input) && simpul_1.default.isString(input.url);
}
exports.default = configurizeInputs;
