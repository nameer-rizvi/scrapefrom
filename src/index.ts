import "cross-fetch/polyfill";
import { Config } from "./interfaces";
import configurize from "./1.configurize";

async function scrapefrom(
  ...inputs: Config[] | Config[][] | string[] | string[][] | any[] | any[][]
): Promise<Config | Config[]> {
  const configs = configurize(inputs);

  console.log(configs);

  // await getResponsesWithFetch(configs);
  // await getResponsesWithPuppeteer(configs);
  return { url: "" };
  // const results = extractData(configs);
}

export = scrapefrom;
