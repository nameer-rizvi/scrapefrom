import * as utils from "@nameer/utils";

function logger(isEnabled = false, processName: string, configName: string) {
  if (isEnabled !== true) return utils.noop;

  const prefix = processName.slice(0, 3);

  return function log(
    message: string,
    method: "info" | "error" = "info",
  ): void {
    console[method](`[scrapefrom:${prefix}] ${configName}: ${message}`);
  };
}

export default logger;
