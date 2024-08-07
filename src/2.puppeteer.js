const simpul = require("simpul");
const puppeteer = require("puppeteer");

async function puppeteerResponses(configs) {
  try {
    const puppeteerConfigs = configs.filter((config) => {
      return config.use === "puppeteer";
    });

    if (!puppeteerConfigs.length) return;

    const browser = await puppeteer.launch({ headless: "new" });

    const page = await browser.newPage();

    const abortTypes = ["image", "img", "stylesheet", "css", "font"];

    for (const config of puppeteerConfigs) {
      if (!config.name) config.name = new URL(config.url).hostname;

      const log = makeLog(config.logFetch, config.name);

      try {
        page.setDefaultNavigationTimeout(config.timeout || 30000);

        log("Request sent.");

        if (config.waitForSelector) {
          await page.goto(config.url, {
            waitUntil: "domcontentloaded",
            ...config.pageGoTo,
          });

          await page.waitForSelector(config.waitForSelector);

          if (config.selectDropdown) {
            await page.select(
              config.selectDropdown[0],
              config.selectDropdown[1],
            ); // === page.select(selector, value)
          }

          const pageContent = await page.content();

          log("Response received.");

          config.response = simpul.parsejson(pageContent) || pageContent;
        } else {
          page.removeAllListeners("request");

          await page.setRequestInterception(true);

          await page.on("request", async (interceptedRequest) => {
            if (abortTypes.includes(interceptedRequest.resourceType())) {
              await interceptedRequest.abort();
            } else await interceptedRequest.continue();
          });

          const response = await page.goto(config.url, config.pageGoTo);

          log("Response received.");

          const parsedResponse = await response[config.parser || "text"]();

          config.response = config.parser
            ? parsedResponse
            : simpul.parsejson(parsedResponse) || parsedResponse;
        }
      } catch (error) {
        log(error.toString(), "error");
        config.error = error.toString();
      }
    }

    await browser.close();
  } catch (error) {
    throw new Error(error);
  }
}

function makeLog(logFetch, configName) {
  return (message, method = "info") => {
    if (logFetch) {
      console[method](`[scrapefrom:puppeteer] ${configName}: ${message}`);
    }
  };
}

module.exports = puppeteerResponses;
