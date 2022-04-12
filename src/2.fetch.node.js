const { isObject, parseJSON } = require("simpul");
const nodefetch = require("node-fetch");

async function fetchNodeResponses(configs) {
  for (let config of configs)
    if (isObject(config) && (!config.use || config.use === "node-fetch"))
      try {
        let { logFetch, name, url, fetch = {}, responseParser, index } = config;

        if (!name) name = url;

        if (logFetch)
          console.log(`[scrapefrom:node-fetch] fetching ${name}...`);

        let response = await nodefetch(url, fetch);

        if (response.ok) {
          if (logFetch)
            console.log(`[scrapefrom:node-fetch] fetched  ${name}.`);

          let parsedResponse = await response[responseParser || "text"]();

          configs[index].response = responseParser
            ? parsedResponse
            : parseJSON(parsedResponse) || parsedResponse;
        } else
          configs[index].error =
            response.statusText || response.status.toString();
      } catch (error) {
        configs[config.index].error = error.toString();
      }
}

module.exports = fetchNodeResponses;
