import "cross-fetch/polyfill";
import { Config } from "./interfaces";
import configurizeInputs from "./1.configurizeInputs";
import getResponsesWithFetch from "./2.getResponsesWithFetch";
import getResponsesWithPuppeteer from "./2.getResponsesWithPuppeteer";
import extractDataFromResponses from "./3.extractDataFromResponses";

async function scrapefrom(
  ...inputs: Config[] | Config[][] | string[] | string[][] | any[] | any[][]
): Promise<Config | Config[]> {
  const configs = configurizeInputs(inputs);

  await getResponsesWithFetch(configs);

  await getResponsesWithPuppeteer(configs);

  const results = extractDataFromResponses(configs);

  return results;
}

export = scrapefrom;
