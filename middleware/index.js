const validate = require("./validate");
const axios = require("./axios");
const cheerio = require("./cheerio");

const _custom = require("./_custom/index");

function webscrape(search, config) {
  const { api, selector } = config;

  return new Promise((resolve, reject) => {
    validate(search)
      .then(validatedSearch => {
        return axios(validatedSearch, api);
      })
      .then(params => {
        return cheerio(params, selector);
      })
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject(err);
      });
  });
}

module.exports = { webscrape, _custom };
