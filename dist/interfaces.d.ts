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
    extractor?: (response: any[] | Record<string, unknown> | CheerioAPI) => any;
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
}
export interface JsonNode {
    tag: string | null;
    attributes: {
        [key: string]: any;
    };
    children: JsonNode[];
    textContent: string | null;
}
