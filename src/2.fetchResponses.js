const fetch = require("node-fetch");
const puppeteer = require("puppeteer");

function tryJSONResponse(parsedResponse) {
  try {
    const responseJSON = JSON.parse(parsedResponse);
    return responseJSON;
  } catch {
    return parsedResponse;
  }
}

async function nodeFetcher({ url, api, responseParser }) {
  try {
    const response = await fetch(url || api);
    if (response.ok) {
      const parsedResponse = await response[responseParser || "text"]();
      return responseParser ? parsedResponse : tryJSONResponse(parsedResponse);
    } else {
      const error = response.statusText || response.status.toString();
      throw new Error(error);
    }
  } catch (error) {
    throw new Error(error);
  }
}

async function puppeteerFetcher({ url, responseParser }) {
  try {
    const browser = await puppeteer.launch();

    const page = await browser.newPage();

    await page.setDefaultNavigationTimeout(0);

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

    const response = await page.goto(url);

    const parsedResponse = await response[responseParser || "text"]();

    await browser.close();

    return responseParser ? parsedResponse : tryJSONResponse(parsedResponse);
  } catch (error) {
    throw new Error(error);
  }
}

const fetchResponses = (configs) =>
  new Promise((resolve, reject) => {
    const fetches = configs.map((config) =>
      config.use === "puppeteer"
        ? puppeteerFetcher(config)
        : nodeFetcher(config)
    );

    Promise.allSettled(fetches)
      .then((responses) => resolve({ responses, configs }))
      .catch(reject);
  });

module.exports = fetchResponses;