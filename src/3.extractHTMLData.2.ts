import { CheerioAPI } from "cheerio";
import { JsonNode } from "./interfaces";
import dottpath from "dottpath";
import simpul from "simpul";

function extractHTMLData2($: CheerioAPI): {
  head: JsonNode;
  body: JsonNode;
  map: string[];
} {
  const head = nodeToJson($("head"), $);
  const body = nodeToJson($("body"), $);
  const map = dottpath.map({ head, body });
  return { head, body, map };
}

function nodeToJson(node: CheerioAPI | any, $: CheerioAPI): JsonNode {
  const jsonNode: JsonNode = {
    tag: null,
    attributes: {},
    children: [],
    textContent: null,
  };

  if (!node?.length) return jsonNode;

  const element = node[0] as any;

  if (element.type === "text") {
    jsonNode.textContent = simpul.trim(element.data) || null;
  } else if (element.type === "tag") {
    jsonNode.tag = element.tagName.toLowerCase() || null;

    for (const [name, value] of Object.entries(element.attribs || {})) {
      jsonNode.attributes[name] = value as any;
    }

    const children: JsonNode[] = [];

    node.contents().each((_: number, child: any) => {
      const childJson = nodeToJson($(child), $);
      if (childJson.tag || childJson.textContent) children.push(childJson);
    });

    jsonNode.children = children;
  }

  return jsonNode;
}

export default extractHTMLData2;
