import { Config, JsonNode } from "./interfaces";
import parseHTML from "./util.parseHTML";
import dottpath from "dottpath";
import simpul from "simpul";

function extractHTMLData2(config: Config): {
  head: JsonNode;
  body: JsonNode;
  map: string[];
} {
  const doc = parseHTML(config.response);

  const headJson = nodeToJson(doc.head);

  const bodyJson = nodeToJson(doc.body);

  const result = { head: headJson, body: bodyJson };

  const map = dottpath.map(result);

  return { ...result, map };
}

function nodeToJson(node: Node): JsonNode {
  const jsonNode: JsonNode = {
    tag: null,
    attributes: {},
    children: [],
    textContent: null,
  };

  if (node.nodeType === node.ELEMENT_NODE) {
    const element = node as HTMLElement;
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
    jsonNode.textContent = simpul.trim(node.textContent || "") || null;
  }

  return jsonNode;
}

export default extractHTMLData2;
