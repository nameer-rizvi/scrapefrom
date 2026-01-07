"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dottpath_1 = __importDefault(require("dottpath"));
const simpul_1 = __importDefault(require("simpul"));
function extractHTMLData2($) {
    const head = nodeToJson($("head"), $);
    const body = nodeToJson($("body"), $);
    const map = dottpath_1.default.map({ head, body });
    return { head, body, map };
}
function nodeToJson(node, $) {
    const jsonNode = {
        tag: null,
        attributes: {},
        children: [],
        textContent: null,
    };
    if (!(node === null || node === void 0 ? void 0 : node.length))
        return jsonNode;
    const element = node[0];
    if (element.type === "text") {
        jsonNode.textContent = simpul_1.default.trim(element.data) || null;
    }
    else if (element.type === "tag") {
        jsonNode.tag = element.tagName.toLowerCase() || null;
        for (const [name, value] of Object.entries(element.attribs || {})) {
            jsonNode.attributes[name] = value;
        }
        const children = [];
        node.contents().each((_, child) => {
            const childJson = nodeToJson($(child), $);
            if (childJson.tag || childJson.textContent)
                children.push(childJson);
        });
        jsonNode.children = children;
    }
    return jsonNode;
}
exports.default = extractHTMLData2;
