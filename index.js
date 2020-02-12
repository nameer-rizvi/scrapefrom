const { webscrape, _custom } = require("./src/index");

exports.googleNews = search => {
  return webscrape(search, "googleNews");
};

exports.twitter = search => {
  return webscrape(search, "twitter");
};

exports.custom = customConfig => {
  return _custom(customConfig);
};
