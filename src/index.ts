import "cross-fetch/polyfill";
import { Config } from "./interfaces";
import configurizeInputs from "./1.configurizeInputs";
import getResponsesWithFetch from "./2.getResponsesWithFetch";
import getResponsesWithPuppeteer from "./2.getResponsesWithPuppeteer";
import extractDataFromResponses from "./3.extractDataFromResponses";

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

export = scrapefrom;
