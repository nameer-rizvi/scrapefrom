"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function logger(logFetch = false, processName, configName) {
    processName = processName.slice(0, 3);
    return function log(message, method = "info") {
        if (logFetch === true) {
            console[method](`[scrapefrom:${processName}] ${configName}: ${message}`);
        }
    };
}
exports.default = logger;
