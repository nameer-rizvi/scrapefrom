export interface Config {
    index?: number;
    url: string;
    use?: "fetch" | "puppeteer";
    name?: string;
    logFetch?: boolean;
    timeout?: number | NodeJS.Timeout;
    fetch?: RequestInit;
    parser?: "json" | "text" | "blob" | "formData" | "arrayBuffer";
    response?: any;
    error?: string;
}
