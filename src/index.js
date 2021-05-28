const makeConfigs = require("./1.makeConfigs");
const fetchResponses = require("./2.fetchResponses");
const handleResponses = require("./3.handleResponses");
const parseResponses = require("./4.parseResponses");

const scrapefrom = (input) =>
  new Promise((resolve, reject) =>
    makeConfigs(input)
      .then(fetchResponses)
      .then(handleResponses)
      .then(parseResponses)
      .then(resolve)
      .catch(reject)
  );

module.exports = scrapefrom;
