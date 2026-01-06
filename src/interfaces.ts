import { GoToOptions } from "puppeteer";

export interface Config {
  index?: number;
  url: string;
  use?: "fetch" | "puppeteer";
  name?: string;
  logFetch?: boolean;
  timeout?: number | NodeJS.Timeout;
  fetch?: RequestInit;
  parser?: "json" | "text" | "blob" | "formData" | "arrayBuffer";
  response?: any;
  error?: string;
  // launch?: Record<string, any>;
  // cookie?: { name: string; value: string; domain: string };
  // waitForSelector?: string;
  // pageGoTo?: GoToOptions;
  // select?: string[];
  // includeResponse?: boolean;
  // extractor?: Function;
  // extract?: ExtractConfig;
  // extracts?: ExtractConfig[];
  // keyPath?: { [key: string]: string };
  // result?: any;
  // delimiter?: string | null;
}

// export interface ExtractConfig {
//   name?: string;
//   selector?: string;
//   attribute?: string;
//   delimiter?: string | null;
//   json?: boolean;
//   filter?: (json: any) => boolean;
//   keyPath?: { [key: string]: string };
//   extract?: ExtractConfig;
//   extracts?: ExtractConfig[];
// }

// export interface JsonNode {
//   tag: string | null;
//   attributes: { [key: string]: string };
//   children: JsonNode[];
//   textContent: string | null;
// }
