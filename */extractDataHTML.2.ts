import { Config } from "./interfaces";
import simpul from "simpul";
import { stripHtml } from "string-strip-html";

function extractDataHTML2(config: Config) {
  const html = config.response;

  const htmlSplits = makeHtmlSplits(html);

  const htmlStripped = stripHtml(config.response).result;

  const htmlStrippedSplits = makeHtmlSplits(htmlStripped);

  return { html, htmlSplits, htmlStripped, htmlStrippedSplits };
}

function makeHtmlSplits(raw: string) {
  const htmls = raw.split("\n");

  const splits = [];

  for (const html of htmls) {
    const trimmed = simpul.trim(html);
    if (trimmed) splits.push(trimmed);
  }

  return splits;
}

export default extractDataHTML2;
