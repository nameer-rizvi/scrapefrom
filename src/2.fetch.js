const simpul = require("simpul");
const fetcher = requireFetch();

async function fetchResponses(configs) {
  for (let config of configs)
    if (simpul.isObject(config) && (!config.use || config.use === "fetch")) {
      if (!config.name) config.name = config.url;

      const log = makeLog(config.logFetch, config.name);

      try {
        log("Request sent.");

        addAbortControllerWithTimeout(config);

        let response = await fetcher(config.url, config.fetch);

        if (response.ok) {
          log("Response received.");

          let parsedResponse = await response[config.parser || "text"]();

          config.response = config.parser
            ? parsedResponse
            : simpul.parseJSON(parsedResponse) || parsedResponse;
        } else {
          throw new Error(response.statusText || response.status.toString());
        }
      } catch (error) {
        log(error.toString(), "error");
        config.error = error.toString();
      } finally {
        clearTimeout(config.timeout);
      }
    }
}

function requireFetch() {
  if (typeof fetch === "undefined") {
    return require("node-fetch");
  } else return fetch;
}

function makeLog(logFetch, configName) {
  return (message, method = "info") => {
    if (logFetch) {
      console[method](`[scrapefrom:fetch] ${configName}: ${message}`);
    }
  };
}

function addAbortControllerWithTimeout(config) {
  let timeout = 30000; // 30 seconds.

  if (typeof config.timeout === "number") {
    timeout = config.timeout;
  } else if (typeof config.fetch?.timeout === "number") {
    timeout = config.fetch.timeout;
  }

  const controller = new AbortController();

  config.timeout = setTimeout(() => {
    controller.abort();
  }, timeout);

  config.fetch = { ...config.fetch, signal: controller.signal };

  delete config.fetch.timeout;
}

module.exports = fetchResponses;
