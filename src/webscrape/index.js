const config = require("./config/index");
const validate = require("./validate");
const axios = require("./axios");

module.exports = (search, site) => {
  return new Promise((resolve, reject) => {
    validate(search)
      .then(validatedSearch => {
        return axios(validatedSearch, config[site]);
      })
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject(err);
      });
  });
};
