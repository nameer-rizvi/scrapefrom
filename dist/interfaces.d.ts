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
    keyPath?: {
        [key: string]: string;
    };
    result?: any;
}
export interface ExtractConfig {
}
