import "cross-fetch/polyfill";
import { Config, Result } from "./interfaces";
import configurize from "./configurize";
import getResponsesWithFetch from "./getResponsesWithFetch";
import getResponsesWithPuppeteer from "./getResponsesWithPuppeteer";
import extractData from "./extractData";

async function scrapefrom(
  ...inputs: Config[] | Config[][] | string[] | string[][] | any[] | any[][]
): Promise<Result | Result[]> {
  const configs = configurize(...inputs);

  await getResponsesWithFetch(configs);

  await getResponsesWithPuppeteer(configs);

  const results = extractData(configs);

  return results;
}

export = scrapefrom;
