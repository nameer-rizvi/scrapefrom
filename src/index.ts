import "cross-fetch/polyfill";
import { Config } from "./interfaces";
import configurize from "./1.configurize";
import getResponsesWithFetch from "./2.getResponsesWithFetch";

async function scrapefrom(
  ...inputs: Config[] | Config[][] | string[] | string[][] | any[] | any[][]
): Promise<Config | Config[]> {
  const configs = configurize(inputs);

  await getResponsesWithFetch(configs);

  console.log(configs);
  // await getResponsesWithPuppeteer(configs);
  return { url: "" };
  // const results = extractData(configs);
}

export = scrapefrom;
