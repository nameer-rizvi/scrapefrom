import { Config } from "./interfaces";
import simpul from "simpul";

function configurizeInputs(...inputs: unknown[]): Config[] {
  const configs: Config[] = [];

  for (const input of inputs) {
    if (simpul.isString(input)) {
      configs.push({ url: input });
    } else if (simpul.isArray(input)) {
      configs.push(...configurizeInputs(...input));
    } else if (isConfig(input)) {
      configs.push(input);
    }
  }

  for (let i = 0; i < configs.length; i++) {
    configs[i].index = i;
  }

  return configs;
}

function isConfig(input: unknown): input is Config {
  return simpul.isObject(input) && simpul.isString((input as any).url);
}

export default configurizeInputs;
