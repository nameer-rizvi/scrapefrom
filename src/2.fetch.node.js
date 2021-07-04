const fetch = require("node-fetch");
const tryJSONResponse = require("./util.tryJSONResponse");

async function fetchNodeResponses(configs) {
  const fetchConfigs = configs.filter(
    (config) => !config.use || config.use === "node-fetch"
  );

  for (let i = 0; i < fetchConfigs.length; i++) {
    let { logFetch, url, api, responseParser, index } = fetchConfigs[i];

    if (logFetch) console.log(`[scrapefrom:node-fetch] fetching "${url}"`);

    try {
      const response = await fetch(url || api);

      if (response.ok) {
        const parsedResponse = await response[responseParser || "text"]();

        configs[index].response = responseParser
          ? parsedResponse
          : tryJSONResponse(parsedResponse);

        if (logFetch) console.log(`[scrapefrom:node-fetch] fetched  "${url}"`);
      } else
        configs[index].error =
          response.statusText || response.status.toString();
    } catch (error) {
      configs[index].error = error.toString();
    }
  }
}

module.exports = fetchNodeResponses;
