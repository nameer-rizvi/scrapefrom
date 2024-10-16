import { Config, ExtractConfig } from "./interfaces";
import * as cheerio from "cheerio";
import simpul from "simpul";
import extractDataWithKeyPath from "./3.extractDataWithKeyPath";

function extractHTMLData1(
  config: Partial<Config>,
  $: cheerio.CheerioAPI,
): Record<string, any> {
  const result: Record<string, any> = {};

  const extractConfigs = getExtractConfigs(config.extract, config.extracts);

  if (!extractConfigs.length) return result;

  for (let i = 0; i < extractConfigs.length; i++) {
    const {
      json: extractJSON,
      extract: extractChild,
      extracts: extractChildren,
      selector,
      attribute,
      filter: jsonFilter,
      keyPath: jsonKeyPath,
      ...extractConfig
    } = extractConfigs[i];

    let name, delimiter;

    if (typeof extractConfig.name === "string") {
      name = extractConfig.name;
    } else if (typeof selector === "string") {
      name = [selector, attribute].filter(Boolean).join("_");
    } else {
      name = i.toString();
    }

    if (typeof extractConfig.delimiter === "string") {
      delimiter = extractConfig.delimiter;
    } else if (extractConfig.delimiter === null) {
      delimiter = null; // To prevent use of parent config.delimiter.
    } else if (typeof config.delimiter === "string") {
      delimiter = config.delimiter;
    } else if (config.delimiter === null) {
      delimiter = null;
    }

    if (extractJSON === true) {
      let array: any[] = [];
      for (const scriptType of ["application/ld+json", "application/json"]) {
        $(`script[type="${scriptType}"]`).each((_, child) => {
          const html = $(child).html() || "";
          let json = simpul.parsejson(html);
          if (!json) json = simpul.parsejson(html.replace(/\\/g, ""));
          if (json) array.push(json);
        });
      }
      array = array.flat();
      if (jsonFilter) array = array.filter(jsonFilter);
      if (jsonKeyPath) {
        array = array.map((response) =>
          extractDataWithKeyPath({ response, keyPath: jsonKeyPath }),
        );
      }
      result[name] = array;
    } else if (extractChild || extractChildren) {
      const nestedConfig = {
        extract: extractChild,
        extracts: extractChildren,
        delimiter,
      };
      const array: any[] = [];
      $(selector).each((_, child) => {
        const html = $(child).html() || "";
        const htmlCheerioOptions = { xml: { decodeEntities: false } };
        const htmlCheerio = cheerio.load(html, htmlCheerioOptions);
        array.push(extractHTMLData1(nestedConfig, htmlCheerio));
      });
      result[name] = array;
    } else if (selector) {
      const array: string[] = [];
      $(selector).each((_, child) => {
        const text = attribute ? $(child).attr(attribute) : $(child).text();
        const item = simpul.trim(text || "");
        if (typeof item === "string" && item.length) array.push(item);
      });
      if (typeof delimiter === "string") {
        result[name] = array.join(delimiter);
      } else {
        result[name] = array;
      }
    }
  }

  return result;
}

function getExtractConfigs(
  extract?: ExtractConfig,
  extracts: ExtractConfig[] = [],
): ExtractConfig[] {
  const extractConfigs: ExtractConfig[] = [];
  for (const extractConfig of [extract, ...extracts]) {
    if (typeof extractConfig === "string") {
      extractConfigs.push({ selector: extractConfig });
    } else if (Array.isArray(extractConfig)) {
      extractConfigs.push(...getExtractConfigs(...extractConfig));
    } else if (extractConfig && simpul.isObject(extractConfig)) {
      const isValid =
        typeof extractConfig.selector === "string" ||
        extractConfig.json === true;
      if (isValid) extractConfigs.push(extractConfig);
    }
  }
  return extractConfigs;
}

export default extractHTMLData1;
