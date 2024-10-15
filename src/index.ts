import "cross-fetch/polyfill";
import { Config } from "./interfaces";
import configurize from "./1.configurize";
import getResponsesWithFetch from "./2.getResponsesWithFetch";
import getResponsesWithPuppeteer from "./2.getResponsesWithPuppeteer";

async function scrapefrom(
  ...inputs: Config[] | Config[][] | string[] | string[][] | any[] | any[][]
): Promise<Config | Config[]> {
  const configs = configurize(inputs);

  await getResponsesWithFetch(configs);

  await getResponsesWithPuppeteer(configs);

  return { url: "" };
  // const results = extractData(configs);
}

export = scrapefrom;
