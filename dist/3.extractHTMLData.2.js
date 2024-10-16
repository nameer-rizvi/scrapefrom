"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const simpul_1 = __importDefault(require("simpul"));
const dottpath_1 = __importDefault(require("dottpath"));
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
function extractHTMLData2(config) {
    const doc = parseHTML(config.response);
    const headJson = nodeToJson(doc.head);
    const bodyJson = nodeToJson(doc.body);
    const result = { head: headJson, body: bodyJson };
    const map = dottpath_1.default.map(result);
    return Object.assign(Object.assign({}, result), { map });
}
function nodeToJson(node) {
    const jsonNode = {
        tag: null,
        attributes: {},
        children: [],
        textContent: null,
    };
    if (node.nodeType === node.ELEMENT_NODE) {
        const element = node;
        jsonNode.tag = element.tagName.toLowerCase();
        for (const attr of Array.from(element.attributes)) {
            jsonNode.attributes[attr.name] = attr.value;
        }
    }
    for (const child of Array.from(node.childNodes)) {
        const childJson = nodeToJson(child);
        if (childJson.textContent || childJson.tag) {
            jsonNode.children.push(childJson);
        }
    }
    if (node.nodeType === node.TEXT_NODE) {
        jsonNode.textContent = simpul_1.default.trim(node.textContent || "") || null;
    }
    return jsonNode;
}
exports.default = extractHTMLData2;
