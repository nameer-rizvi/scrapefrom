import { CheerioAPI, Cheerio } from "cheerio";
import type { AnyNode } from "domhandler";
import { HTMLData, JsonNode } from "./interfaces";
import dottpath from "dottpath";
import simpul from "simpul";

function extractHTMLData2($: CheerioAPI): HTMLData {
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

  jsonNode.textContent = simpul.trim(element.data) || null;

  jsonNode.tag = element.tagName?.toLowerCase() || null;

  for (const [name, value] of Object.entries(element.attribs || {})) {
    jsonNode.attributes[name] = value as any;
  }

  const children: JsonNode[] = [];

  node.contents().each((_: number, child: any) => {
    children.push(nodeToJson($(child), $));
  });

  jsonNode.children = children;

  return jsonNode;
}

export default extractHTMLData2;
