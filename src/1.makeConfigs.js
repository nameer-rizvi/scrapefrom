const { isString, isArray } = require("simpul");

const makeConfig = (input) =>
  isString(input)
    ? [{ url: input }]
    : isArray(input)
    ? input.map(makeConfig)
    : [input];

const makeConfigs = (input) =>
  new Promise((resolve) => resolve(makeConfig(input).flat(Infinity)));

module.exports = makeConfigs;
