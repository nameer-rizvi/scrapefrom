import { Config } from "./interfaces";
import simpul from "simpul";

function configurize(
  ...inputs: Config[] | Config[][] | string[] | string[][] | any[] | any[][]
): Config[] {
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

  return configs;
}

export default configurize;
