import simpul from "simpul";

let parseHTML: (html: string) => Document;

if (simpul.support.inWindow("DOMParser")) {
  // Browser environment
  parseHTML = (html: string): Document => {
    const parser = new DOMParser();
    return parser.parseFromString(html, "text/html");
  };
} else {
  // Node.js environment
  const jsdom = require("jsdom");
  parseHTML = (html: string): Document => {
    const dom = new jsdom.JSDOM(html);
    return dom.window.document;
  };
}

export default parseHTML;
