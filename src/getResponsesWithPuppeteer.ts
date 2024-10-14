import { Config } from "./interfaces";
import puppeteer, { Browser, Page, PuppeteerLaunchOptions } from "puppeteer";
import simpul from "simpul";

// https://pptr.dev/guides/getting-started
async function getResponsesWithPuppeteer(configs: Config[]) {
  try {
    const puppeteerConfigs = configs.filter((config) => {
      return config.use === "puppeteer";
    });

    if (!puppeteerConfigs.length) return;

    const browser: Browser = await puppeteer.launch(); // https://pptr.dev/guides/headless-modes/

    const page: Page = await browser.newPage();

    const abortTypes = ["image", "img", "stylesheet", "css", "font"];

    for (const config of puppeteerConfigs) {
      if (!config.name) config.name = new URL(config.url).hostname;

      const log = makeLog(config.logFetch, config.name);

      try {
        let timeout =
          typeof config.timeout === "number" ? config.timeout : 30000;

        page.setDefaultNavigationTimeout(timeout);

        log("Request sent.");

        if (config.waitForSelector) {
          await page.goto(config.url, {
            waitUntil: "domcontentloaded",
            ...config.pageGoTo,
          });

          await page.waitForSelector(config.waitForSelector);

          if (config.select?.length) {
            const [selector, ...values] = config.select;
            await page.select(selector, ...values);
          }

          const pageContent = await page.content();

          log("Response received.");

          config.response = simpul.parsejson(pageContent) || pageContent;
        } else {
          page.removeAllListeners("request");

          await page.setRequestInterception(true);

          page.on("request", (interceptedRequest) => {
            if (abortTypes.includes(interceptedRequest.resourceType())) {
              interceptedRequest.abort();
            } else {
              interceptedRequest.continue();
            }
          });

          const response = await page.goto(config.url, config.pageGoTo);

          if (response === null) {
            throw new Error("Response is null.");
          } else if (!response.ok()) {
            const status = response.statusText() || response.status();
            throw new Error(status.toString());
          }

          log("Response received.");

          const parsedResponse = await response[config.parser || "text"]();

          config.response = config.parser
            ? parsedResponse
            : simpul.parsejson(parsedResponse) || parsedResponse;
        }
      } catch (error) {
        if (error instanceof Error) {
          log(error.toString(), "error");
          config.error = error.toString();
        }
      }
    }

    await browser.close();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.toString());
    }
  }
}

function makeLog(logFetch: boolean = false, configName: string) {
  return (message: string, method: "info" | "error" = "info") => {
    if (logFetch === true) {
      console[method](`[scrapefrom:puppe] ${configName}: ${message}`);
    }
  };
}

export default getResponsesWithPuppeteer;
