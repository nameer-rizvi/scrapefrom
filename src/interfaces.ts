import { GoToOptions } from "puppeteer";

export interface Config {
  index?: number;
  url: string;
  name?: string;
  use?: "fetch" | "puppeteer";
  logFetch?: boolean;
  timeout?: number | NodeJS.Timeout;
  fetch?: RequestInit;
  waitForSelector?: string;
  pageGoTo?: GoToOptions;
  select?: string[];
  parser?: "text" | "json";
  response?: any;
  includeResponse?: boolean;
  error?: string;
  extractor?: Function;
  extract?: ExtractConfig;
  extracts?: ExtractConfig[];
  keyPath?: { [key: string]: string };
  result?: any;
}

export interface ExtractConfig {}

export interface JsonNode {
  tag: string | null;
  attributes: { [key: string]: string };
  children: JsonNode[];
  textContent: string | null;
}

// TODO
// ...
// json?: boolean;
// filter?: (json: any) => boolean;
// keyPath?: Record<string, any>;
// name?: string;
// extract?: ExtractConfig;
// extracts?: ExtractConfig[];
// selector?: string;
// attribute?: string;
// delimiter?: string | null;
