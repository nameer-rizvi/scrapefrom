"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const simpul_1 = __importDefault(require("simpul"));
let parseHTML;
if (simpul_1.default.support.inWindow("DOMParser")) {
    // Browser environment
    parseHTML = (html) => {
        const parser = new DOMParser();
        return parser.parseFromString(html, "text/html");
    };
}
else {
    // Node.js environment
    const jsdom = require("jsdom");
    parseHTML = (html) => {
        const dom = new jsdom.JSDOM(html);
        return dom.window.document;
    };
}
exports.default = parseHTML;
