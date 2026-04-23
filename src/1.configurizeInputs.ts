import { type Config } from "./interfaces.js";
import * as utils from "@nameer/utils";

function configurizeInputs(...inputs: unknown[]): Config[] {
  const configs: Config[] = [];

  for (const input of inputs) {
    if (utils.isString(input)) {
      configs.push({ url: input });
    } else if (utils.isArray(input)) {
      configs.push(...configurizeInputs(...(input as unknown[])));
    } else if (isConfig(input)) {
      configs.push(input);
    }
  }

  return configs;
}

function isConfig(input: unknown): input is Config {
  if (!utils.isObject(input)) return false;
  const url = (input as unknown as Config).url;
  return utils.isUrlString(url) || utils.isUrl(url);
}

export default configurizeInputs;
