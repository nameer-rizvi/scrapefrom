const { isObject, parseJSON } = require("simpul");

async function fetchNodeResponses(configs) {
  for (let config of configs)
    if (isObject(config) && (!config.use || config.use === "fetch")) {
      if (!config.name) config.name = config.url;

      function log(message, method = "info") {
        console[method](`[scrapefrom:fetch] ${config.name}: ${message}.`);
      }

      try {
        if (config.logFetch) log("fetching...");

        addAbortControllerWithTimeout(config);

        let response = await fetch(config.url, config.fetch);

        if (response.ok) {
          if (config.logFetch) log("fetch complete");

          let parsedResponse = await response[config.parser || "text"]();

          config.response = config.parser
            ? parsedResponse
            : parseJSON(parsedResponse) || parsedResponse;
        } else {
          throw new Error(response.statusText || response.status.toString());
        }
      } catch (error) {
        if (config.logFetch) log(error.toString(), "error");
        config.error = error.toString();
      } finally {
        clearTimeout(config.timeout);
      }
    }
}

function addAbortControllerWithTimeout(config) {
  const time =
    typeof config.timeout === "number"
      ? config.timeout
      : typeof config.fetch?.timeout === "number"
      ? config.fetch.timeout
      : 30000;

  const controller = new AbortController();

  config.timeout = setTimeout(() => {
    controller.abort();
  }, time);

  config.fetch = { ...config.fetch, signal: controller.signal };

  delete config.fetch.timeout;
}

module.exports = fetchNodeResponses;
