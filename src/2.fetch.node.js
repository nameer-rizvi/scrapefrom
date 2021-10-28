const { isObject, parseJSON } = require("simpul");
const nodefetch = require("node-fetch");

async function fetchNodeResponses(configs) {
  for (let config of configs) {
    if (isObject(config) && (!config.use || config.use === "node-fetch")) {
      let { logFetch, url, api, responseParser, index } = config;

      try {
        if (logFetch) console.log(`[scrapefrom:node-fetch] fetching ${url}...`);

        let response = await nodefetch(url || api);

        if (response.ok) {
          if (logFetch) console.log(`[scrapefrom:node-fetch] fetched  ${url}.`);

          let parsedResponse = await response[responseParser || "text"]();

          configs[index].response = responseParser
            ? parsedResponse
            : parseJSON(parsedResponse) || parsedResponse;
        } else {
          let responseError = response.statusText || response.status.toString();
          configs[index].error = responseError;
        }
      } catch (error) {
        configs[index].error = error.toString();
      }
    }
  }
}

module.exports = fetchNodeResponses;
