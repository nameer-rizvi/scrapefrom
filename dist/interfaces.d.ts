import { LaunchOptions, CookieData, GoToOptions, WaitForSelectorOptions } from "puppeteer";
import { CheerioAPI } from "cheerio";
export type KeyPath = {
    [key: string]: string;
};
export interface Config {
    index?: number;
    url: string;
    use?: "fetch" | "puppeteer";
    name?: string;
    logFetch?: boolean;
    timeout?: number | NodeJS.Timeout;
    fetch?: RequestInit;
    parser?: "json" | "text";
    launch?: LaunchOptions;
    cookies?: CookieData[];
    pageGoTo?: GoToOptions;
    waitForSelector?: string;
    waitForSelectorOptions?: WaitForSelectorOptions;
    select?: string[];
    response?: any;
    error?: string;
    keyPath?: KeyPath;
    extractor?: (response: any[] | Record<string, unknown> | CheerioAPI) => any;
    extract?: ExtractConfig;
    extracts?: ExtractConfig[];
    delimiter?: string | null;
    result?: any;
    includeResponse?: boolean;
    includeTimeout?: boolean;
}
export interface ExtractConfig {
    name?: string;
    delimiter?: string | null;
    selector?: string;
    attribute?: string;
    json?: boolean;
    filter?: (json: any) => boolean;
    keyPath?: KeyPath;
    extract?: ExtractConfig;
    extracts?: ExtractConfig[];
}
export interface JsonNode {
    tag: string | null;
    attributes: {
        [key: string]: any;
    };
    children: JsonNode[];
    textContent: string | null;
}
