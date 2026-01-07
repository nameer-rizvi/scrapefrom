import { CheerioAPI, Cheerio } from "cheerio";
import type { AnyNode } from "domhandler";
import { JsonNode } from "./interfaces";
import dottpath from "dottpath";
import simpul from "simpul";

function extractHTMLData2($: CheerioAPI): {
  head: JsonNode;
  body: JsonNode;
  map: string[];
  extract: (path: string) => unknown;
} {
  const head = nodeToJson($("head"), $);
  const body = nodeToJson($("body"), $);
  const map = dottpath.map({ head, body });
  const extract = (path: string) => dottpath.extract({ head, body }, path);
  return { head, body, map, extract };
}

function nodeToJson(node: Cheerio<AnyNode>, $: CheerioAPI): JsonNode {
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
    jsonNode.tag = element.tagName.toLowerCase();

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
