const { webscrape, _custom } = require("./src/index");

exports.googleNews = (search, age) => webscrape("googleNews", search, age);

exports.twitter = (search, age) => webscrape("twitter", search, age);

exports.custom = customConfig => _custom(customConfig);
