import { Config } from "./interfaces";
import simpul from "simpul";

async function getResponsesWithFetch(configs: Config[]) {
  for (const config of configs) {
    if (config.use && config.use !== "fetch") continue;

    if (!config.name) config.name = new URL(config.url).hostname;

    const log = makeLog(config.logFetch, config.name);

    try {
      log("Request sent.");

      const controller = new AbortController();

      const timeout =
        typeof config.timeout === "number" ? config.timeout : 30000; // 30 seconds.

      config.timeout = setTimeout(() => {
        controller.abort();
      }, timeout);

      config.fetch = { ...config.fetch, signal: controller.signal };

      const response = await fetch(config.url, config.fetch);

      if (!response.ok) {
        throw new Error(response.statusText || response.status.toString());
      }

      log("Response received.");

      const parsedResponse = await response[config.parser || "text"]();

      config.response = config.parser
        ? parsedResponse
        : simpul.parsejson(parsedResponse) || parsedResponse;
    } catch (error) {
      if (error instanceof Error) {
        log(error.toString(), "error");
        config.error = error.toString();
      }
    } finally {
      clearTimeout(config.timeout);
    }
  }
}

function makeLog(logFetch: boolean = false, configName: string) {
  return (message: string, method: "info" | "error" = "info") => {
    if (logFetch === true) {
      console[method](`[scrapefrom:fetch] ${configName}: ${message}`);
    }
  };
}

export default getResponsesWithFetch;
