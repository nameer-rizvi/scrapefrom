import { GoToOptions } from "puppeteer";

export interface Config {
  index?: number;
  url: string;
}

export interface ExtractConfig {}

// TODO

// name?: string;
// use?: "fetch" | "puppeteer";
// logFetch?: boolean;
// timeout?: number | NodeJS.Timeout;
// fetch?: RequestInit;
// pageGoTo?: GoToOptions;
// waitForSelector?: string;
// select?: string[];
// parser?: "text" | "json";
// response?: any;
// error?: string;
// extract?: ExtractConfig;
// extracts?: ExtractConfig[];
// extractor?: Function;
// keyPath?: { [key: string]: any };
// result?: any;
// includeResponse?: boolean;

// json?: boolean;
// filter?: (json: any) => boolean;
// keyPath?: Record<string, any>;
// name?: string;
// extract?: ExtractConfig;
// extracts?: ExtractConfig[];
// selector?: string;
// attribute?: string;
// delimiter?: string | null;
