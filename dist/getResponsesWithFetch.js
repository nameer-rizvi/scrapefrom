"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const simpul_1 = __importDefault(require("simpul"));
function getResponsesWithFetch(configs) {
    return __awaiter(this, void 0, void 0, function* () {
        for (const config of configs) {
            if (config.use && config.use !== "fetch")
                continue;
            if (!config.name)
                config.name = new URL(config.url).hostname;
            const log = makeLog(config.logFetch, config.name);
            try {
                log("Request sent.");
                const controller = new AbortController();
                const timeout = typeof config.timeout === "number" ? config.timeout : 30000; // 30 seconds.
                config.timeout = setTimeout(() => {
                    controller.abort();
                }, timeout);
                config.fetch = Object.assign(Object.assign({}, config.fetch), { signal: controller.signal });
                const response = yield fetch(config.url, config.fetch);
                if (!response.ok) {
                    throw new Error(response.statusText || response.status.toString());
                }
                log("Response received.");
                const parsedResponse = yield response[config.parser || "text"]();
                config.response = config.parser
                    ? parsedResponse
                    : simpul_1.default.parsejson(parsedResponse) || parsedResponse;
            }
            catch (error) {
                if (error instanceof Error) {
                    log(error.toString(), "error");
                    config.error = error.toString();
                }
            }
            finally {
                clearTimeout(config.timeout);
            }
        }
    });
}
function makeLog(logFetch = false, configName) {
    return (message, method = "info") => {
        if (logFetch === true) {
            console[method](`[scrapefrom:fetch] ${configName}: ${message}`);
        }
    };
}
exports.default = getResponsesWithFetch;
