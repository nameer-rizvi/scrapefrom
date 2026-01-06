import { Config } from "./interfaces";
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { Browser, Page } from "puppeteer";
import logger from "./logger";
import simpul from "simpul";

async function getResponsesWithPuppeteer(configs: Config[]) {
  const puppeteerConfigs = configs.filter((c) => c.use === "puppeteer");

  if (!puppeteerConfigs.length) return;

  puppeteer.use(StealthPlugin());

  const launchOptions = configs.find((c) => c.launch)?.launch;

  const browser: Browser = await puppeteer.launch(launchOptions); // https://pptr.dev/guides/headless-modes/

  const abortTypes = new Set(["image", "img", "stylesheet", "css", "font"]);

  try {
    for (const config of puppeteerConfigs) {
      if (!config.name) config.name = new URL(config.url).hostname;

      const log = logger(config.logFetch, "puppeteer", config.name);

      const page: Page = await browser.newPage();

      await page.setRequestInterception(true);

      page.on("request", (interceptedRequest) => {
        if (abortTypes.has(interceptedRequest.resourceType())) {
          interceptedRequest.abort();
        } else {
          interceptedRequest.continue();
        }
      });

      try {
        if (config.cookies) await browser.setCookie(...(config.cookies || []));

        const timeoutMs = simpul.isNumber(config.timeout)
          ? config.timeout
          : 30000; // 30 seconds.

        page.setDefaultNavigationTimeout(timeoutMs);

        log("Request sent.");

        if (config.waitForSelector) {
          await page.goto(config.url, {
            waitUntil: "domcontentloaded",
            ...config.pageGoTo,
          });

          await page.waitForSelector(
            config.waitForSelector,
            config.waitForSelectorOptions,
          );

          if (config.select?.length) {
            const [selector, ...values] = config.select;
            await page.select(selector, ...values);
          }

          const pageContent = await page.content();

          config.response = simpul.parseJson(pageContent) || pageContent;
        } else {
          const response = await page.goto(config.url, config.pageGoTo);

          if (response === null) {
            throw new Error("Response is null.");
          } else if (!response.ok()) {
            const err = response.statusText() || response.status().toString();
            throw new Error(err);
          }

          const parsedResponse = await response[config.parser || "text"]();

          config.response = config.parser
            ? parsedResponse
            : simpul.parseJson(parsedResponse) || parsedResponse;
        }

        log("Response received.");
      } catch (error) {
        if (error instanceof Error) {
          config.error = error.toString();
          log(config.error, "error");
        }
      } finally {
        await page.close();
      }
    }
  } finally {
    await browser.close();
  }
}

export default getResponsesWithPuppeteer;

// https://pptr.dev/guides/getting-started
