const puppeteer = require("puppeteer");
const tryJSONResponse = require("./util.tryJSONResponse");

async function fetchPuppeteerResponses(configs) {
  const fetchConfigs = configs.filter((config) => config.use === "puppeteer");

  if (fetchConfigs.length) {
    try {
      const browser = await puppeteer.launch();

      const page = await browser.newPage();

      for (let i = 0; i < fetchConfigs.length; i++) {
        let {
          logFetch,
          url,
          timeout = 30000,
          waitForSelector,
          pageGoTo,
          selectDropdown,
          index,
          responseParser,
        } = fetchConfigs[i];

        page.setDefaultNavigationTimeout(timeout);

        try {
          if (logFetch) console.log(`[scrapefrom:puppeteer] fetching "${url}"`);

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
              : tryJSONResponse(parsedResponse);
          }

          if (logFetch) console.log(`[scrapefrom:puppeteer] fetched  "${url}"`);
        } catch (error) {
          configs[index].error = error.toString();
        }
      }

      await browser.close();
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = fetchPuppeteerResponses;
