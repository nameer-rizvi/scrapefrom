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
const logger_1 = __importDefault(require("./logger"));
const simpul_1 = __importDefault(require("simpul"));
function getResponsesWithFetch(configs) {
    return __awaiter(this, void 0, void 0, function* () {
        for (const config of configs) {
            if (config.use && config.use !== "fetch")
                continue; // "fetch" is default
            if (!config.name)
                config.name = new URL(config.url).hostname;
            const log = (0, logger_1.default)(config.log, "fetch", config.name);
            try {
                const controller = new AbortController();
                const timeoutMs = simpul_1.default.isNumber(config.timeout)
                    ? config.timeout
                    : 30000; // 30 seconds
                config.timeout = setTimeout(controller.abort, timeoutMs);
                config.fetch = Object.assign(Object.assign({}, config.fetch), { signal: controller.signal });
                log("Request sent.");
                const response = yield fetch(config.url, config.fetch);
                if (!response.ok) {
                    throw new Error(response.statusText || response.status.toString());
                }
                log("Response received.");
                const parsedResponse = yield response[config.parser || "text"]();
                config.response = config.parser
                    ? parsedResponse
                    : simpul_1.default.parseJson(parsedResponse) || parsedResponse;
            }
            catch (error) {
                if (error instanceof Error) {
                    config.error = error.toString();
                    log(config.error, "error");
                }
            }
            finally {
                clearTimeout(config.timeout);
            }
        }
    });
}
exports.default = getResponsesWithFetch;
