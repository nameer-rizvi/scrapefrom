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
const puppeteer_extra_1 = __importDefault(require("puppeteer-extra"));
const puppeteer_extra_plugin_stealth_1 = __importDefault(require("puppeteer-extra-plugin-stealth"));
const logger_1 = __importDefault(require("./logger"));
const simpul_1 = __importDefault(require("simpul"));
const ABORT_TYPES = new Set(["image", "stylesheet", "font", "media"]);
function getResponsesWithPuppeteer(configs) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const puppeteerConfigs = configs.filter((c) => c.use === "puppeteer");
        if (!puppeteerConfigs.length)
            return;
        puppeteer_extra_1.default.use((0, puppeteer_extra_plugin_stealth_1.default)());
        const launchOptions = (_a = configs.find((c) => c.launch)) === null || _a === void 0 ? void 0 : _a.launch;
        const browser = yield puppeteer_extra_1.default.launch(launchOptions); // https://pptr.dev/guides/headless-modes/
        try {
            for (const config of puppeteerConfigs) {
                if (!config.name)
                    config.name = new URL(config.url).hostname;
                const log = (0, logger_1.default)(config.log, "puppeteer", config.name);
                const page = yield browser.newPage();
                try {
                    yield page.setRequestInterception(true);
                    page.on("request", (req) => {
                        if (ABORT_TYPES.has(req.resourceType())) {
                            req.abort();
                        }
                        else {
                            req.continue();
                        }
                    });
                    if (config.cookies)
                        yield page.setCookie(...(config.cookies || []));
                    config.pageGoTo = Object.assign({ waitUntil: "domcontentloaded", timeout: 30000 }, config.pageGoTo);
                    log("Request sent.");
                    if (config.waitForSelector) {
                        yield page.goto(config.url, config.pageGoTo);
                        yield page.waitForSelector(config.waitForSelector, config.waitForSelectorOptions);
                        if ((_b = config.select) === null || _b === void 0 ? void 0 : _b.length) {
                            const [selector, ...values] = config.select;
                            yield page.select(selector, ...values);
                        }
                        const response = yield page.content();
                        config.response = simpul_1.default.parseJson(response) || response;
                    }
                    else {
                        const response = yield page.goto(config.url, config.pageGoTo);
                        if (response === null) {
                            throw new Error("Response is null.");
                        }
                        else if (!response.ok()) {
                            const err = response.statusText() || response.status().toString();
                            throw new Error(err);
                        }
                        const parsedResponse = yield response[config.parser || "text"]();
                        config.response = config.parser
                            ? parsedResponse
                            : simpul_1.default.parseJson(parsedResponse) || parsedResponse;
                    }
                    log("Response received.");
                }
                catch (error) {
                    if (error instanceof Error) {
                        config.error = error.toString();
                        log(config.error, "error");
                    }
                }
                finally {
                    yield page.close();
                }
            }
        }
        finally {
            yield browser.close();
        }
    });
}
exports.default = getResponsesWithPuppeteer;
// https://pptr.dev/guides/getting-started
