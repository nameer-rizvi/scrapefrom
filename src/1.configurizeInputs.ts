import { Config } from "./interfaces";
import simpul from "simpul";

function configurizeInputs(
  ...inputs: Config[] | Config[][] | string[] | string[][] | any[] | any[][]
): Config[] {
  const configs: Config[] = [];

  for (const input of inputs) {
    if (typeof input === "string") {
      configs.push({ url: input });
    } else if (simpul.isObject(input)) {
      if (typeof input.url === "string") configs.push(input);
    } else if (Array.isArray(input)) {
      configs.push(...configurizeInputs(...input));
    }
  }

  for (let i = 0; i < configs.length; i++) {
    configs[i].index = i;
  }

  return configs;
}

export default configurizeInputs;
