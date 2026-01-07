import { LaunchOptions, CookieData, GoToOptions, WaitForSelectorOptions } from "puppeteer";
import { CheerioAPI, Cheerio } from "cheerio";
import type { AnyNode } from "domhandler";
export type KeyPath = {
    [key: string]: string;
};
export interface Config {
    index?: number;
    url: string;
    name?: string;
    use?: "fetch" | "puppeteer";
    timeout?: number | NodeJS.Timeout;
    fetch?: RequestInit;
    parser?: "json" | "text";
    launch?: LaunchOptions;
    cookies?: CookieData[];
    waitForSelector?: string;
    waitForSelectorOptions?: WaitForSelectorOptions;
    pageGoTo?: GoToOptions;
    select?: string[];
    response?: any;
    keyPath?: KeyPath;
    extractor?: (response: unknown[] | Record<string, unknown> | CheerioAPI) => unknown;
    extract?: ExtractConfig;
    extracts?: ExtractConfig[];
    delimiter?: string | null;
    result?: any;
    error?: string;
    log?: boolean;
    includeResponse?: boolean;
    includeTimeout?: boolean;
}
export interface ExtractConfig {
    name?: string;
    delimiter?: string | null;
    selector?: string;
    attribute?: string;
    json?: boolean;
    extract?: ExtractConfig;
    extracts?: ExtractConfig[];
    extractor?: ($: CheerioAPI, parent?: Cheerio<AnyNode>) => any;
}
export interface JsonNode {
    tag: string | null;
    attributes: {
        [key: string]: any;
    };
    children: JsonNode[];
    textContent: string | null;
}
