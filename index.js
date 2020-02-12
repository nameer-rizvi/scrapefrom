const config = require("./config/index");

const { webscrape, _custom } = require("./middleware/index");

exports.googleNews = search => {
  return webscrape(search, config.googleNews);
};

exports.twitter = search => {
  return webscrape(search, config.twitter);
};

exports.custom = customConfig => {
  return _custom(customConfig);
};
