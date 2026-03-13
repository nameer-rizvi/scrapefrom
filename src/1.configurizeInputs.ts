import { Config } from "./interfaces";
import simpul from "simpul";

function configurizeInputs(...inputs: unknown[]): Config[] {
  const configs: Config[] = [];

  let index = 0;

  for (const input of inputs) {
    if (simpul.isString(input)) {
      configs.push({ url: input });
    } else if (simpul.isArray(input)) {
      configs.push(...configurizeInputs(...input));
    } else if (isConfig(input)) {
      configs.push({ index, ...input });
      index++;
    }
  }

  return configs;
}

function isConfig(input: unknown): input is Config {
  if (!simpul.isObject(input)) return false;
  const url = (input as any).url;
  return simpul.isURLString(url) || simpul.isURL(url);
}

export default configurizeInputs;
