import { Config, ExtractConfig } from "./interfaces";
import { CheerioAPI, Cheerio } from "cheerio";
import type { AnyNode } from "domhandler";
import * as cheerio from "cheerio";
import simpul from "simpul";
import extractDataWithKeyPath from "./3.extractDataWithKeyPath";

function extractHTMLData1(
  config: Partial<Config>,
  $: CheerioAPI,
  parent?: Cheerio<AnyNode>,
): Record<string, any> {
  const result: Record<string, any> = {};

  const extractConfigs = getExtractConfigs(config.extract, config.extracts);

  for (let i = 0; i < extractConfigs.length; i++) {
    const {
      name: explicitName,
      delimiter: localDelimiter,
      selector,
      attribute,
      json: extractJSON,
      filter: jsonFilter,
      keyPath: jsonKeyPath,
      extract: extractChild,
      extracts: extractChildren,
      extractor: extractCustom,
    } = extractConfigs[i];

    let name, delimiter;

    if (simpul.isString(explicitName)) {
      name = explicitName;
    } else if (simpul.isString(selector)) {
      name = [selector, attribute].filter(Boolean).join("_");
    } else {
      name = i.toString();
    }

    if (simpul.isString(localDelimiter)) {
      delimiter = localDelimiter;
    } else if (localDelimiter === null) {
      delimiter = null; // To override parent delimiter
    } else if (simpul.isString(config.delimiter)) {
      delimiter = config.delimiter;
    } else if (config.delimiter === null) {
      delimiter = null;
    }

    if (extractJSON === true) {
      let array: any[] = [];
      for (const scriptType of ["application/ld+json", "application/json"]) {
        $(`script[type="${scriptType}"]`).each((_, child) => {
          const html = $(child).html() || "";
          let json = simpul.parseJson(html);
          if (!json) json = simpul.parseJson(html.replace(/\\/g, ""));
          if (json) array.push(json);
        });
      }
      array = array.flat();
      if (jsonFilter) array = array.filter(jsonFilter);
      if (jsonKeyPath) {
        array = array.map((response) => {
          return extractDataWithKeyPath({ response, keyPath: jsonKeyPath });
        });
      }
      result[name] = array;
    } else if (extractChild || extractChildren) {
      const nestedConfig: Partial<Config> = {
        extract: extractChild,
        extracts: extractChildren,
        delimiter,
      };
      const array: any[] = [];
      $(selector).each((_, child) => {
        const html = $(child).html() || "";
        const $$ = cheerio.load(html, { xml: { decodeEntities: false } });
        array.push(extractHTMLData1(nestedConfig, $$, $(child)));
      });
      result[name] = array;
    } else if (selector) {
      const array: string[] = [];
      $(selector).each((_, child) => {
        const text = attribute ? $(child).attr(attribute) : $(child).text();
        const item = simpul.trim(text);
        if (simpul.isStringNonEmpty(item)) array.push(item);
      });
      if (simpul.isString(delimiter)) {
        result[name] = array.join(delimiter);
      } else {
        result[name] = array;
      }
    } else if (extractCustom) {
      result[name] = extractCustom($, parent);
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
    if (simpul.isString(extractConfig)) {
      extractConfigs.push({ selector: extractConfig });
    } else if (simpul.isArray(extractConfig)) {
      extractConfigs.push(...getExtractConfigs(...extractConfig));
    } else if (simpul.isObject(extractConfig)) {
      const isValid =
        simpul.isString(extractConfig.selector) ||
        simpul.isFunction(extractConfig.extractor) ||
        extractConfig.json === true;
      if (isValid) extractConfigs.push(extractConfig);
    }
  }
  return extractConfigs;
}

export default extractHTMLData1;
