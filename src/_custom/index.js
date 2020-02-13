const validate = require("./validate");
const axios = require("./axios");
const { cheerio } = require("../shared/index");

module.exports = customConfig => {
  // Not declaring customConfig constants
  // here since customConfig hasn't been
  // validated yet to make sure it contains
  // all the required props.

  return new Promise((resolve, reject) => {
    validate(customConfig)
      .then(() => {
        return axios(customConfig.api);
      })
      .then(html => {
        const {
          selector: { container, text, attr }
        } = customConfig;

        const data = cheerio({ html, container, text, attr });

        resolve(data);
      })
      .catch(err => reject(err));
  });
};
