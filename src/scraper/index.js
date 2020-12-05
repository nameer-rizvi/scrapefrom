const axios = require("axios");
const cheerioSelector = require("./cheerioSelector");
const cheerioStructured = require("./cheerioStructured");
const cheerioCustomParser = require("./cheerioCustomParser");

module.exports = (config) =>
  new Promise((resolve, reject) => {
    const configs =
      config.constructor === Array
        ? config
        : config.constructor === Object
        ? [config]
        : [];

    const promises = configs.map((config) => axios(config.api));

    const handleResponses = (responses) => {
      const data = responses.map((response, index) =>
        response.value && response.value.data && configs[index]
          ? configs[index].structured
            ? cheerioStructured(response.value.data, configs[index].structured)
            : configs[index].selector
            ? cheerioSelector(response.value.data, configs[index].selector)
            : configs[index].customParser
            ? cheerioCustomParser(
                response.value.data,
                configs[index].customParser
              )
            : []
          : []
      );
      resolve(data);
    };

    Promise.allSettled(promises)
      .then(handleResponses)
      .catch(reject);
  });
