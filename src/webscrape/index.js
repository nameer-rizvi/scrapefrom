const config = require("./config/index");
const validate = require("./validate");
const axios = require("./axios");
const timestamps = require("./timestamps");

module.exports = (site, search, age) => {
  const { api, selector, convertTime } = config[site];

  return new Promise((resolve, reject) =>
    validate(search)
      .then(validatedSearch => axios(validatedSearch, age, api, selector))
      .then(data => {
        timestamps(data, convertTime);
        resolve(data);
      })
      .catch(err => reject(err))
  );
};
