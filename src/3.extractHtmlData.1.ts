import {
  type Config,
  type StringOrNull,
  type ExtractConfig,
} from "./interfaces.js";
import { type CheerioAPI, type Cheerio } from "cheerio";
import type { AnyNode } from "domhandler";
import extractDataWithKeyPath from "./3.extractDataWithKeyPath.js";
import * as utilN from "@nameer/utils";
import * as cheerio from "cheerio";

function extractHtmlData1(
  config: Partial<Config>,
  $: CheerioAPI,
  parentNode?: Cheerio<AnyNode>,
): Record<string, unknown> {
  const result: Record<string, unknown> = {};

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

    let name: string;
    let delimiter: StringOrNull | undefined;

    if (utilN.isString(explicitName)) {
      name = explicitName;
    } else if (utilN.isString(selector)) {
      name = [selector, attribute].filter(Boolean).join(" ");
    } else {
      name = i.toString();
    }

    if (utilN.isString(localDelimiter)) {
      delimiter = localDelimiter;
    } else if (localDelimiter === null) {
      delimiter = null;
    } else if (utilN.isString(config.delimiter)) {
      delimiter = config.delimiter;
    } else if (config.delimiter === null) {
      delimiter = null;
    }

    if (extractJSON === true) {
      let array: unknown[] = [];
      for (const scriptType of ["application/ld+json", "application/json"]) {
        $(`script[type="${scriptType}"]`).each((_, child) => {
          const html = $(child).html() ?? "";
          let json = utilN.parseJson(html);
          if (!json) json = utilN.parseJson(html.replace(/\\/g, ""));
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
    } else if (extractChild ?? extractChildren) {
      const nestedConfig: Partial<Config> = {
        extract: extractChild,
        extracts: extractChildren,
        delimiter,
      };
      const array: unknown[] = [];
      $(selector).each((_, child) => {
        const html = $(child).html() ?? "";
        const $$ = cheerio.load(html, { xml: { decodeEntities: false } });
        array.push(extractHtmlData1(nestedConfig, $$, $(child)));
      });
      result[name] = array;
    } else if (extractCustom) {
      result[name] = extractCustom($, parentNode);
    } else if (selector) {
      const array: string[] = [];
      $(selector).each((_, child) => {
        const text = attribute ? $(child).attr(attribute) : $(child).text();
        const item = utilN.trim(text);
        if (utilN.isStringNonEmpty(item)) array.push(item);
      });
      result[name] = utilN.isString(delimiter) ? array.join(delimiter) : array;
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
    if (utilN.isString(extractConfig)) {
      extractConfigs.push({ selector: extractConfig });
    } else if (utilN.isArray(extractConfig)) {
      const castedExtractConfig = extractConfig as ExtractConfig[];
      extractConfigs.push(...getExtractConfigs(...castedExtractConfig));
    } else if (utilN.isObject(extractConfig)) {
      const isValid =
        extractConfig.json === true ||
        utilN.isString(extractConfig.selector) ||
        utilN.isFunction(extractConfig.extractor);
      if (isValid) extractConfigs.push(extractConfig);
    }
  }
  return extractConfigs;
}

export default extractHtmlData1;
