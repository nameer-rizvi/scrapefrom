const simpul = require("simpul");
const fetcher = requireFetch();

async function fetchResponses(configs) {
  for (const config of configs) {
    if (config.use && config.use !== "fetch") continue;

    if (!config.name) config.name = new URL(config.url).hostname;

    const log = makeLog(config.logFetch, config.name);

    try {
      log("Request sent.");

      addAbortControllerWithTimeout(config);

      const response = await fetcher(config.url, config.fetch);

      if (!response.ok) {
        throw new Error(response.statusText || response.status.toString());
      }

      log("Response received.");

      let parsedResponse = await response[config.parser || "text"]();

      config.response = config.parser
        ? parsedResponse
        : simpul.parsejson(parsedResponse) || parsedResponse;
    } catch (error) {
      log(error.toString(), "error");
      config.error = error.toString();
    } finally {
      clearTimeout(config.timeout);
    }
  }
}

function requireFetch() {
  if (typeof fetch === "undefined") return require("node-fetch");
  return fetch;
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
