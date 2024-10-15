function logger(
  logFetch: boolean = false,
  processName: string,
  configName: string,
) {
  processName = processName.slice(0, 3);
  return function log(message: string, method: "info" | "error" = "info") {
    if (logFetch === true) {
      console[method](`[scrapefrom:${processName}] ${configName}: ${message}`);
    }
  };
}

export default logger;
