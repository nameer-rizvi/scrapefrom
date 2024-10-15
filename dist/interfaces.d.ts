export interface Config {
    index?: number;
    url: string;
    name?: string;
    use?: "fetch" | "puppeteer";
    logFetch?: boolean;
    timeout?: number | NodeJS.Timeout;
    fetch?: RequestInit;
    parser?: "text" | "json";
    response?: any;
    error?: string;
}
export interface ExtractConfig {
}
