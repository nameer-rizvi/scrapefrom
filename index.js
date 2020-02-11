const config = require("./config/index");

const { validate, axios, cheerio, _custom } = require("./middleware/index");

function webscrape(search, site) {
  const { api, selector } = config[site];

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

exports.googleNews = search => {
  return webscrape(search, "googleNews");
};

exports.twitter = search => {
  return webscrape(search, "twitter");
};

exports.custom = customConfig => {
  return _custom(customConfig);
};
