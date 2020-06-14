const axios = require("axios");
const cheerio = require("./cheerio");
const cheerioStructured = require("./cheerioStructured");

module.exports = ({ config, structuredDataConfig }) =>
  new Promise((resolve, reject) => {
    const configs =
      config.constructor === Array
        ? config
        : config.constructor === Object
        ? [config]
        : [];

    const requests = configs.map((config) =>
      axios.get(config.api.url, { params: config.api.params })
    );

    const handleResponses = (responses) => {
      const data = responses.map((response, index) =>
        structuredDataConfig
          ? cheerioStructured(response.data, configs[index])
          : cheerio(response.data, configs[index].selector)
      );
      resolve(data);
    };

    axios
      .all(requests)
      .then(handleResponses)
      .catch(reject);
  });
