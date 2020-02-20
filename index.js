const { webscrape, _custom } = require("./src/index");

exports.googleNews = (search, age) => {
  return webscrape("googleNews", search, age);
};

exports.twitter = (search, age) => {
  return webscrape("twitter", search, age);
};

exports.custom = customConfig => {
  return _custom(customConfig);
};
