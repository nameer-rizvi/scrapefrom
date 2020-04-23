const axios = require("axios");
const cheerio = require("./cheerio");

module.exports = (config) =>
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
      const data = responses.map((response, index) => {
        const { container, text, attr } = configs[index].selector;
        return cheerio(response.data, container, text, attr);
      });
      resolve(data);
    };

    axios
      .all(requests)
      .then(handleResponses)
      .catch(reject);
  });
