import { LaunchOptions, CookieData, GoToOptions, WaitForSelectorOptions } from "puppeteer";
import { CheerioAPI } from "cheerio";
export type KeyPath = {
    [key: string]: string;
};
export interface Config {
    index?: number;
    url: string;
    name?: string;
    use?: "fetch" | "puppeteer";
    log?: boolean;
    timeout?: number | NodeJS.Timeout;
    fetch?: RequestInit;
    parser?: "json" | "text";
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
}
export interface JsonNode {
    tag: string | null;
    attributes: {
        [key: string]: any;
    };
    children: JsonNode[];
    textContent: string | null;
}
