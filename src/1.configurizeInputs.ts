import { type Config } from "./interfaces.js";
import * as utilN from "@nameer/utils";

function configurizeInputs(...inputs: unknown[]): Config[] {
  const configs: Config[] = [];

  for (const input of inputs) {
    if (utilN.isString(input)) {
      configs.push({ url: input });
    } else if (utilN.isArray(input)) {
      configs.push(...configurizeInputs(...(input as unknown[])));
    } else if (isConfig(input)) {
      configs.push(input);
    }
  }

  return configs;
}

function isConfig(input: unknown): input is Config {
  if (!utilN.isObject(input)) return false;
  const url = (input as unknown as Config).url;
  return utilN.isUrlString(url) || utilN.isUrl(url);
}

export default configurizeInputs;
