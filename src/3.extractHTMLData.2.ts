import simpul from "simpul";
import { Config, JsonNode } from "./interfaces";
import dottpath from "dottpath";

let parseHtml: (html: string) => Document;

if (simpul.isEnvWindowProperty("DOMParser")) {
  // Browser environment
  parseHtml = (html: string): Document => {
    return new DOMParser().parseFromString(html, "text/html");
  };
} else {
  // Node.js environment
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const jsdom = require("jsdom");
  parseHtml = (html: string): Document => {
    return new jsdom.JSDOM(html).window.document;
  };
}

function extractHTMLData2(config: Config): {
  head: JsonNode;
  body: JsonNode;
  map: string[];
} {
  const doc = parseHtml(config.response);
  const head = nodeToJson(doc.head);
  const body = nodeToJson(doc.body);
  const map = dottpath.map({ head, body });
  return { head, body, map };
}

function nodeToJson(node: Node): JsonNode {
  switch (node.nodeType) {
    case node.TEXT_NODE: {
      return {
        tag: null,
        attributes: {},
        children: [],
        textContent: simpul.trim(node.textContent) || null,
      };
    }
    case node.ELEMENT_NODE: {
      const element = node as HTMLElement;
      const tag = element.tagName.toLowerCase();
      const attributes: Record<string, string> = {};
      for (const attribute of element.attributes) {
        attributes[attribute.name] = attribute.value;
      }
      const children: JsonNode[] = [];
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

export default extractHTMLData2;
