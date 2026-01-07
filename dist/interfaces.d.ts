import { LaunchOptions, CookieData, GoToOptions, WaitForSelectorOptions } from "puppeteer";
export type KeyPath = {
    [key: string]: string;
};
export interface Config {
    index?: number;
    url: string;
    error?: string;
    use?: "fetch" | "puppeteer";
    name?: string;
    log?: boolean;
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
}
export interface ExtractConfig {
}
export interface JsonNode {
}
