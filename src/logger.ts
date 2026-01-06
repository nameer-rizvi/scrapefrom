import simpul from "simpul";

function logger(enabled = false, processName: string, configName: string) {
  if (enabled !== true) {
    return simpul.noop;
  }

  const prefix = processName.slice(0, 3);

  return function log(message: string, method: "info" | "error" = "info") {
    console[method](`[scrapefrom:${prefix}] ${configName}: ${message}`);
  };
}

export default logger;
