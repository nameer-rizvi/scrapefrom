const { isObject } = require("./utils");
const validateObject = require("./object");

module.exports = (configArray, reject) =>
  configArray.forEach((configObject, index) => {
    const customReject = (msg) => reject(`configs[${index}]: ${msg}`);
    !configObject && customReject("config is null or undefined");
    !isObject(configObject) && customReject("config must be an object");
    validateObject(configObject, customReject);
  });
