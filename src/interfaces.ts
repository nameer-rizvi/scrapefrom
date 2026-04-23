import type {
  LaunchOptions,
  CookieData,
  GoToOptions,
  WaitForSelectorOptions,
} from "puppeteer";
import type { CheerioAPI, Cheerio } from "cheerio";
import type { AnyNode } from "domhandler";

export type PathResolver = Record<string, string>;

export type StringOrNull = string | null;

export interface Config {
  url: string | URL;
  name?: string;
  use?: "fetch" | "puppeteer";
  log?: boolean;
  timeout?: ReturnType<typeof setTimeout>;
  fetch?: RequestInit;
  parser?: "json" | "text"; // Puppeteer-supported parsers only.
  launch?: LaunchOptions;
  cookies?: CookieData[];
  pageGoTo?: GoToOptions;
  waitForSelector?: string;
  waitForSelectorOptions?: WaitForSelectorOptions;
  select?: string[];
  selects?: string[][];
  response?: unknown;
  error?: string;
  keyPath?: PathResolver;
  extractor?: (res: unknown) => unknown; // The `res` argument will be a `CheerioAPI` instance when scraping HTML pages.
  extract?: ExtractConfig;
  extracts?: ExtractConfig[];
  delimiter?: StringOrNull;
  result?: unknown;
  includeResponse?: boolean;
  includeTimeout?: boolean;
}

export interface ExtractConfig {
  name?: string;
  delimiter?: StringOrNull;
  selector?: string;
  attribute?: string;
  json?: boolean;
  filter?: (res: unknown) => boolean;
  keyPath?: PathResolver;
  extract?: ExtractConfig;
  extracts?: ExtractConfig[];
  extractor?: ($: CheerioAPI, parentNode?: Cheerio<AnyNode>) => unknown;
}

export interface HtmlData {
  head: JsonNode;
  body: JsonNode;
  map: string[];
  extract: (path: unknown) => unknown;
}

export interface JsonNode {
  tag: StringOrNull;
  attributes: Record<string, unknown>;
  children: JsonNode[];
  textContent: StringOrNull;
}
