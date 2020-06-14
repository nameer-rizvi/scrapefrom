const { isArray, isObject } = require("./utils");
const validateObject = require("./object");
const validateArray = require("./array");

module.exports = (config, structuredDataConfig) =>
  new Promise((resolve, reject) => {
    !config && reject("config is null or undefined");
    if (!structuredDataConfig) {
      const testObject = isObject(config);
      const testArray = isArray(config);
      !testObject &&
        !testArray &&
        reject("config must be an object or an array");
      testObject && validateObject(config, reject);
      testArray && validateArray(config, reject);
    }
    resolve({ config, structuredDataConfig });
  });
