import "cross-fetch/polyfill";
import { Config, Result } from "./interfaces";
import simpul from "simpul";
import getResponsesWithFetch from "./getResponsesWithFetch";
import getResponsesWithPuppeteer from "./getResponsesWithPuppeteer";

async function scrapefrom(
  ...inputs: Config[] | Config[][] | string[] | string[][] | any[] | any[][]
): Promise<Result | Result[]> {
  // Configurize inputs

  const configs: Config[] = [];

  for (const input of inputs) {
    if (typeof input === "string") {
      configs.push({ url: input });
    } else if (simpul.isObject(input)) {
      if (typeof input.url === "string") configs.push(input);
    } else if (Array.isArray(input)) {
      for (const i of input) {
        if (typeof i === "string") {
          configs.push({ url: i });
        } else if (simpul.isObject(i)) {
          if (typeof i.url === "string") configs.push(i);
        }
      }
    }
  }

  for (let i = 0; i < configs.length; i++) {
    if (typeof configs[i].index !== "number") configs[i].index = i;
  }

  // Get responses with fetch and/or puppeteer

  await getResponsesWithFetch(configs);

  await getResponsesWithPuppeteer(configs);

  console.log(configs);

  // Return results
  return {};
}

export = scrapefrom;

// import extractData from "./extractData";
// const results = await extractData(configs);
// return results;
