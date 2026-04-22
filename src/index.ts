import { type Config } from "./interfaces.js";
import configurizeInputs from "./1.configurizeInputs.js";
import getResponsesWithFetch from "./2.getResponsesWithFetch.js";
import getResponsesWithPuppeteer from "./2.getResponsesWithPuppeteer.js";
import extractDataFromResponses from "./3.extractDataFromResponses.js";

/**
 * Scrapes data from one or more webpages.
 * Accepts a URL string, a single config object, or an array of config objects.
 * Returns a single `Config` result for one input, or an array for multiple.
 * Throws if a single-input scrape encounters an error.
 * @example
 * // Scrape full page data:
 * await scrapefrom("https://example.com")
 *
 * // Extract elements by selector:
 * await scrapefrom({ url: "https://example.com", extract: { name: "titles", selector: "h1" } })
 *
 * // Extract from multiple URLs:
 * await scrapefrom(
 *   { url: "https://example.com", extracts: [{ name: "titles", selector: "h1" }] },
 *   { url: "https://example.org", extracts: [{ name: "titles", selector: "h1" }] },
 * )
 */
async function scrapefrom(...inputs: unknown[]): Promise<Config | Config[]> {
  const configs = configurizeInputs(inputs);

  await getResponsesWithFetch(configs);

  await getResponsesWithPuppeteer(configs);

  extractDataFromResponses(configs);

  if (configs.length === 1) {
    if (configs[0]?.error) throw new Error(configs[0].error);
    return configs[0];
  }

  return configs;
}

export default scrapefrom;
