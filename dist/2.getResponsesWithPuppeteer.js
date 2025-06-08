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
const util_logger_1 = __importDefault(require("./util.logger"));
const simpul_1 = __importDefault(require("simpul"));
function getResponsesWithPuppeteer(configs) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const puppeteerConfigs = configs.filter((config) => {
            return config.use === "puppeteer";
        });
        if (!puppeteerConfigs.length)
            return;
        puppeteer_extra_1.default.use((0, puppeteer_extra_plugin_stealth_1.default)());
        const launchOptions = (_a = configs.find((config) => config.launch)) === null || _a === void 0 ? void 0 : _a.launch;
        const browser = yield puppeteer_extra_1.default.launch(launchOptions); // https://pptr.dev/guides/headless-modes/
        const page = yield browser.newPage();
        const abortTypes = ["image", "img", "stylesheet", "css", "font"];
        for (const config of puppeteerConfigs) {
            if (!config.name)
                config.name = new URL(config.url).hostname;
            const log = (0, util_logger_1.default)(config.logFetch, "puppeteer", config.name);
            try {
                if (config.cookie)
                    browser.setCookie(config.cookie);
                const timeout = typeof config.timeout === "number" ? config.timeout : 30000;
                page.setDefaultNavigationTimeout(timeout);
                log("Request sent.");
                if (config.waitForSelector) {
                    yield page.goto(config.url, Object.assign({ waitUntil: "domcontentloaded" }, config.pageGoTo));
                    yield page.waitForSelector(config.waitForSelector);
                    if ((_b = config.select) === null || _b === void 0 ? void 0 : _b.length) {
                        const [selector, ...values] = config.select;
                        yield page.select(selector, ...values);
                    }
                    const pageContent = yield page.content();
                    log("Response received.");
                    config.response = simpul_1.default.parsejson(pageContent) || pageContent;
                }
                else {
                    page.removeAllListeners("request");
                    yield page.setRequestInterception(true);
                    page.on("request", (interceptedRequest) => {
                        if (abortTypes.includes(interceptedRequest.resourceType())) {
                            interceptedRequest.abort();
                        }
                        else {
                            interceptedRequest.continue();
                        }
                    });
                    const response = yield page.goto(config.url, config.pageGoTo);
                    if (response === null) {
                        throw new Error("Response is null.");
                    }
                    else if (!response.ok()) {
                        const status = response.statusText() || response.status().toString();
                        throw new Error(status);
                    }
                    log("Response received.");
                    const parsedResponse = yield response[config.parser || "text"]();
                    config.response = config.parser
                        ? parsedResponse
                        : simpul_1.default.parsejson(parsedResponse) || parsedResponse;
                }
            }
            catch (error) {
                if (error instanceof Error) {
                    log(error.toString(), "error");
                    config.error = error.toString();
                }
            }
        }
        yield browser.close();
    });
}
exports.default = getResponsesWithPuppeteer;
