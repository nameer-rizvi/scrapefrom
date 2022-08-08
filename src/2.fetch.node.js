const { isObject, parseJSON } = require("simpul");
const nodefetch = require("node-fetch");

async function fetchNodeResponses(configs) {
  for (let config of configs)
    if (isObject(config) && (!config.use || config.use === "node-fetch"))
      try {
        let { name, url, logFetch, fetch = {}, parser, index } = config;

        if (!name) name = url;

        if (logFetch)
          console.log(`[scrapefrom:node-fetch] fetching ${name}...`);

        if (typeof fetch.timeout === "number") addTimeoutProp(fetch);

        let response = await nodefetch(url, fetch);

        if (response.ok) {
          if (logFetch)
            console.log(`[scrapefrom:node-fetch] fetched  ${name}.`);

          let parsedResponse = await response[parser || "text"]();

          configs[index].response = parser
            ? parsedResponse
            : parseJSON(parsedResponse) || parsedResponse;
        } else {
          let error = response.statusText || response.status.toString();
          configs[index].error = error;
        }
      } catch (error) {
        configs[config.index].error = error.toString();
      }
}

function addTimeoutProp(fetch) {
  const controller = new AbortController();
  const timeout = setTimeout(() => {
    controller.abort();
  }, fetch.timeout);
  fetch.signal = controller.signal;
  delete fetch.timeout;
}

module.exports = fetchNodeResponses;
