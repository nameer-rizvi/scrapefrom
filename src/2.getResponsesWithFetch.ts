import { type Config } from "./interfaces.js";
import logger from "./logger.js";
import * as utils from "@nameer/utils";

async function getResponsesWithFetch(configs: Config[]): Promise<void> {
  for (const config of configs) {
    if (config.use && config.use !== "fetch") continue; // "fetch" is default

    if (!config.name) config.name = new URL(config.url).hostname;

    const log = logger(config.log, "fetch", config.name);

    try {
      const controller = new AbortController();

      const timeoutMs = utils.isNumber(config.timeout) ? config.timeout : 30000;

      config.timeout = setTimeout(() => controller.abort(), timeoutMs);

      config.fetch = { ...config.fetch, signal: controller.signal };

      log("Request sent.");

      const response = await fetch(config.url, config.fetch);

      if (!response.ok) {
        throw new Error(response.statusText || response.status.toString());
      }

      log("Response received.");

      const parser = config.parser ?? "text";

      const parsedResponse = (await response[parser]()) as unknown;

      config.response = config.parser
        ? parsedResponse
        : utils.parseJson(parsedResponse) ?? parsedResponse;
    } catch (error) {
      if (error instanceof Error) {
        config.error = error.toString();
        log(config.error, "error");
      }
    } finally {
      clearTimeout(config.timeout);
    }
  }
}

export default getResponsesWithFetch;
