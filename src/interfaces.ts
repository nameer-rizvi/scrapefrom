import type {
  LaunchOptions,
  CookieData,
  GoToOptions,
  WaitForSelectorOptions,
} from "puppeteer";
import type { CheerioAPI, Cheerio } from "cheerio";
import type { AnyNode } from "domhandler";

export type KeyPathResolver = Record<string, string>;

export interface Config {
  index?: number;
  url: string | URL;
  name?: string;
  use?: "fetch" | "puppeteer";
  log?: boolean;
  timeout?: number | ReturnType<typeof setTimeout>;
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
  keyPath?: KeyPathResolver;
  extractor?: (res: unknown) => unknown; // The `res` argument will be a `CheerioAPI` instance when scraping HTML pages.
  extract?: ExtractConfig;
  extracts?: ExtractConfig[];
  delimiter?: string | null;
  result?: unknown;
  error?: string;
  includeResponse?: boolean;
  includeTimeout?: boolean;
}

export interface ExtractConfig {
  name?: string;
  delimiter?: string | null;
  selector?: string;
  attribute?: string;
  json?: boolean;
  filter?: (res: unknown) => boolean;
  keyPath?: KeyPathResolver;
  extract?: ExtractConfig;
  extracts?: ExtractConfig[];
  extractor?: ($: CheerioAPI, parentNode?: Cheerio<AnyNode>) => unknown;
}

export interface HTMLData {
  head: JsonNode;
  body: JsonNode;
  map: string[];
  extract: (path: string) => unknown;
}

export interface JsonNode {
  tag: string | null;
  attributes: Record<string, unknown>;
  children: JsonNode[];
  textContent: string | null;
}
