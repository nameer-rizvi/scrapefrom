import {
  LaunchOptions,
  CookieData,
  GoToOptions,
  WaitForSelectorOptions,
} from "puppeteer";
import { CheerioAPI, Cheerio } from "cheerio";
import type { AnyNode } from "domhandler";

export type KeyPath = { [key: string]: string };

export interface Config {
  index?: number;
  url: string;
  name?: string;
  use?: "fetch" | "puppeteer";
  log?: boolean;
  timeout?: number | NodeJS.Timeout;
  fetch?: RequestInit;
  parser?: "json" | "text"; // puppeteer-supported parsers only
  launch?: LaunchOptions;
  cookies?: CookieData[];
  pageGoTo?: GoToOptions;
  waitForSelector?: string;
  waitForSelectorOptions?: WaitForSelectorOptions;
  select?: string[];
  selects?: string[][];
  response?: unknown;
  keyPath?: KeyPath;
  extractor?: (res: unknown | CheerioAPI) => unknown;
  extract?: ExtractConfig;
  extracts?: ExtractConfig[];
  delimiter?: string | null;
  result?: unknown;
  error?: string;
  includeResponse?: boolean;
  includeTimeout?: boolean;
}

export interface ExtractConfig {
  // name?: string;
  // delimiter?: string | null;
  // selector?: string;
  // attribute?: string;
  // json?: boolean;
  // filter?: (res: unknown) => boolean;
  // keyPath?: KeyPath;
  // extract?: ExtractConfig;
  // extracts?: ExtractConfig[];
  // extractor?: ($: CheerioAPI, parent?: Cheerio<AnyNode>) => any;
}

export interface HTMLData {
  head: JsonNode;
  body: JsonNode;
  map: string[];
  extract: (path: string) => unknown;
}

export interface JsonNode {
  tag: string | null;
  attributes: { [key: string]: any };
  children: JsonNode[];
  textContent: string | null;
}
