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
    const extract = (path) => dottpath_1.default.extract({ head, body }, path);
    return { head, body, map, extract };
}
function nodeToJson(node, $) {
    var _a;
    const jsonNode = {
        tag: null,
        attributes: {},
        children: [],
        textContent: null,
    };
    if (!(node === null || node === void 0 ? void 0 : node.length))
        return jsonNode;
    const element = node[0];
    jsonNode.textContent = simpul_1.default.trim(element.data) || null;
    jsonNode.tag = ((_a = element.tagName) === null || _a === void 0 ? void 0 : _a.toLowerCase()) || null;
    for (const [name, value] of Object.entries(element.attribs || {})) {
        jsonNode.attributes[name] = value;
    }
    const children = [];
    node.contents().each((_, child) => {
        children.push(nodeToJson($(child), $));
    });
    jsonNode.children = children;
    return jsonNode;
}
exports.default = extractHTMLData2;
