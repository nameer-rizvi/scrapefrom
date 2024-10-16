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
    delimiter?: string | null;
}
export interface ExtractConfig {
    name?: string;
    selector?: string;
    attribute?: string;
    delimiter?: string | null;
    json?: boolean;
    filter?: (json: any) => boolean;
    keyPath?: {
        [key: string]: string;
    };
    extract?: ExtractConfig;
    extracts?: ExtractConfig[];
}
export interface JsonNode {
    tag: string | null;
    attributes: {
        [key: string]: string;
    };
    children: JsonNode[];
    textContent: string | null;
}
