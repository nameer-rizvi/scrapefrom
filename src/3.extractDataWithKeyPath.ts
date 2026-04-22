import { type Config } from "./interfaces.js";
import dottpath from "dottpath";

function extractDataWithKeyPath(
  config: Partial<Config>,
): Record<string, unknown> {
  const result: Record<string, unknown> = {};

  for (const key in config.keyPath) {
    result[key] = dottpath.extract(config.response, config.keyPath[key]);
  }

  return result;
}

export default extractDataWithKeyPath;
