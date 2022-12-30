const { isObject, parseJSON } = require("simpul");
const puppeteer = require("puppeteer");

async function fetchPuppeteerResponses(configs) {
  try {
    const puppeteerConfigs = configs.filter(
      (config) => isObject(config) && config.use === "puppeteer"
    );

    if (puppeteerConfigs.length) {
      const browser = await puppeteer.launch();

      const page = await browser.newPage();

      for (let config of puppeteerConfigs) {
        if (!config.name) config.name = config.url;

        function log(message, method = "info") {
          console[method](`[scrapefrom:puppeteer] ${config.name}: ${message}.`);
        }

        try {
          page.setDefaultNavigationTimeout(config.timeout || 30000);

          if (config.logFetch) log("fetching...");

          if (config.waitForSelector) {
            await page.goto(config.url, {
              waitUntil: "domcontentloaded",
              ...config.pageGoTo,
            });

            await page.waitForSelector(config.waitForSelector);

            if (config.selectDropdown)
              await page.select(
                config.selectDropdown[0],
                config.selectDropdown[1]
              ); // === page.select(selector, value)

            const pageContent = await page.content();

            config.response = pageContent;
          } else {
            await page.setRequestInterception(true);

            await page.on("request", (interceptedRequest) => {
              const abortTypes = ["image", "img", "stylesheet", "css", "font"];
              abortTypes.includes(interceptedRequest.resourceType())
                ? interceptedRequest.abort()
                : interceptedRequest.continue();
            });

            const response = await page.goto(config.url, config.pageGoTo);

            const parsedResponse = await response[config.parser || "text"]();

            config.response = config.parser
              ? parsedResponse
              : parseJSON(parsedResponse) || parsedResponse;
          }

          if (config.logFetch) log("fetch complete");
        } catch (error) {
          if (config.logFetch) log(error.toString(), "error");
          config.error = error.toString();
        }
      }

      await browser.close();
    }
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = fetchPuppeteerResponses;
