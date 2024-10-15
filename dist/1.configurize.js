"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const simpul_1 = __importDefault(require("simpul"));
function configurize(...inputs) {
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
            configs.push(...configurize(...input));
        }
    }
    for (let i = 0; i < configs.length; i++) {
        configs[i].index = i;
    }
    return configs;
}
exports.default = configurize;
