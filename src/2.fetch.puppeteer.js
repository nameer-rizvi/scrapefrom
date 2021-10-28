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

      for (let puppeteerConfig of puppeteerConfigs) {
        let {
          index,
          timeout = 30000,
          logFetch,
          url,
          waitForSelector,
          pageGoTo,
          selectDropdown,
          responseParser,
        } = puppeteerConfig;

        page.setDefaultNavigationTimeout(timeout);

        if (logFetch) console.log(`[scrapefrom:puppeteer] fetching ${url}...`);

        try {
          if (waitForSelector) {
            await page.goto(url, {
              waitUntil: "domcontentloaded",
              ...pageGoTo,
            });

            await page.waitForSelector(waitForSelector);

            if (selectDropdown)
              await page.select(selectDropdown[0], selectDropdown[1]); // select selector, value

            const pageContent = await page.content();

            configs[index].response = pageContent;
          } else {
            await page.setRequestInterception(true);

            await page.on("request", (interceptedRequest) =>
              interceptedRequest.resourceType() === "image" ||
              interceptedRequest.resourceType() === "img" ||
              interceptedRequest.resourceType() === "stylesheet" ||
              interceptedRequest.resourceType() === "css" ||
              interceptedRequest.resourceType() === "font"
                ? interceptedRequest.abort()
                : interceptedRequest.continue()
            );
            const response = await page.goto(url, pageGoTo);

            const parsedResponse = await response[responseParser || "text"]();

            configs[index].response = responseParser
              ? parsedResponse
              : parseJSON(parsedResponse) || parsedResponse;
          }

          if (logFetch) console.log(`[scrapefrom:puppeteer] fetched  ${url}.`);
        } catch (error) {
          configs[index].error = error.toString();
        }
      }

      await browser.close();
    }
  } catch (error2) {
    throw new Error(error2);
  }
}

module.exports = fetchPuppeteerResponses;
