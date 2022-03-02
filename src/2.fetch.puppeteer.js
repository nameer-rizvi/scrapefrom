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

      for (let puppeteerConfig of puppeteerConfigs)
        try {
          let {
            timeout = 30000,
            logFetch,
            name,
            url,
            api,
            waitForSelector,
            pageGoTo,
            selectDropdown,
            index,
            responseParser,
          } = puppeteerConfig;

          page.setDefaultNavigationTimeout(timeout);

          if (!name) name = url || api;

          if (logFetch)
            console.log(`[scrapefrom:puppeteer] fetching ${name}...`);

          if (waitForSelector) {
            const pageGoToOptions = {
              waitUntil: "domcontentloaded",
              ...pageGoTo,
            };

            await page.goto(url || api, pageGoToOptions);

            await page.waitForSelector(waitForSelector);

            if (selectDropdown)
              await page.select(selectDropdown[0], selectDropdown[1]); // select selector, value

            const pageContent = await page.content();

            configs[index].response = pageContent;
          } else {
            await page.setRequestInterception(true);

            await page.on("request", (interceptedRequest) =>
              ["image", "img", "stylesheet", "css", "font"].includes(
                interceptedRequest.resourceType()
              )
                ? interceptedRequest.abort()
                : interceptedRequest.continue()
            );

            const response = await page.goto(url || api, pageGoTo);

            const parsedResponse = await response[responseParser || "text"]();

            configs[index].response = responseParser
              ? parsedResponse
              : parseJSON(parsedResponse) || parsedResponse;
          }

          if (logFetch) console.log(`[scrapefrom:puppeteer] fetched  ${name}.`);
        } catch (error) {
          configs[puppeteerConfig.index].error = error.toString();
        }

      await browser.close();
    }
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = fetchPuppeteerResponses;
