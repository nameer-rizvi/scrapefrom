const stringStripHtml = require("string-strip-html");
const simpul = require("simpul");

function htmlExtraction1(config) {
  const html = config.response;

  const htmlSplits = makeHtmlSplits(html);

  const htmlStripped = stringStripHtml.stripHtml(config.response).result;

  const htmlStrippedSplits = makeHtmlSplits(htmlStripped);

  return { html, htmlSplits, htmlStripped, htmlStrippedSplits };
}

function makeHtmlSplits(raw) {
  const htmls = raw.split("\n");

  const splits = [];

  for (let html of htmls) {
    let trimmed = simpul.trim(html);
    if (trimmed) splits.push(trimmed);
  }

  return splits;
}

module.exports = htmlExtraction1;
