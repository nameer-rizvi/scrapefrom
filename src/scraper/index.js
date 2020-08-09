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

    const requests = configs.map((config) => axios(config.api));

    const handleResponses = (responses) => {
      const data = responses.map((response, index) =>
        configs[index]
          ? configs[index].structured
            ? cheerioStructured(response.data, configs[index].structured)
            : configs[index].selector
            ? cheerioSelector(response.data, configs[index].selector)
            : configs[index].customParser
            ? cheerioCustomParser(response.data, configs[index].customParser)
            : []
          : []
      );
      resolve(data);
    };

    axios
      .all(requests)
      .then(handleResponses)
      .catch(reject);
  });
