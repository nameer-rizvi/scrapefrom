import { LaunchOptions, CookieData, GoToOptions, WaitForSelectorOptions } from "puppeteer";
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
}
