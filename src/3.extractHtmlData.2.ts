import { type CheerioAPI, type Cheerio } from "cheerio";
import type { AnyNode } from "domhandler";
import { type HtmlData, type JsonNode } from "./interfaces.js";
import dottpath from "dottpath";
import * as utils from "@nameer/utils";

function extractHtmlData2($: CheerioAPI): HtmlData {
  const head = nodeToJson($("head"), $);
  const body = nodeToJson($("body"), $);
  const map = dottpath.map({ head, body });
  const extract = (path: unknown) => dottpath.extract({ head, body }, path);
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

  const element = node[0] as unknown as Record<string, unknown>;

  jsonNode.textContent = utils.trim(element.data) ?? null;

  jsonNode.tag = (element.tagName as string)?.toLowerCase() ?? null;

  const attrs = (element.attribs as Record<string, unknown>) ?? {};

  for (const [name, value] of Object.entries(attrs)) {
    jsonNode.attributes[name] = value;
  }

  const children: JsonNode[] = [];

  node.contents().each((_: number, child: AnyNode) => {
    children.push(nodeToJson($(child), $));
  });

  jsonNode.children = children;

  return jsonNode;
}

export default extractHtmlData2;
