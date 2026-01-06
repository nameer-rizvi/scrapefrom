"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const simpul_1 = __importDefault(require("simpul"));
const dottpath_1 = __importDefault(require("dottpath"));
let parseHtml;
if (simpul_1.default.isEnvWindowProperty("DOMParser")) {
    // Browser environment
    parseHtml = (html) => {
        return new DOMParser().parseFromString(html, "text/html");
    };
}
else {
    // Node.js environment
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const jsdom = require("jsdom");
    parseHtml = (html) => {
        return new jsdom.JSDOM(html).window.document;
    };
}
function extractHTMLData2(config) {
    const doc = parseHtml(config.response);
    const head = nodeToJson(doc.head);
    const body = nodeToJson(doc.body);
    const map = dottpath_1.default.map({ head, body });
    return { head, body, map };
}
function nodeToJson(node) {
    switch (node.nodeType) {
        case node.TEXT_NODE: {
            return {
                tag: null,
                attributes: {},
                children: [],
                textContent: simpul_1.default.trim(node.textContent) || null,
            };
        }
        case node.ELEMENT_NODE: {
            const element = node;
            const tag = element.tagName.toLowerCase();
            const attributes = {};
            for (const attribute of element.attributes) {
                attributes[attribute.name] = attribute.value;
            }
            const children = [];
            for (const child of node.childNodes) {
                const childJson = nodeToJson(child);
                if (childJson.textContent || childJson.tag) {
                    children.push(childJson);
                }
            }
            return {
                tag,
                attributes,
                children,
                textContent: null,
            };
        }
        default: {
            return {
                tag: null,
                attributes: {},
                children: [],
                textContent: null,
            };
        }
    }
}
exports.default = extractHTMLData2;
