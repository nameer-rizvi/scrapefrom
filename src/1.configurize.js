const { isString, isArray } = require("simpul");

const makeConfig = (input) =>
  isString(input)
    ? [{ url: input }]
    : isArray(input)
    ? input.map(makeConfig)
    : [input];

const configurize = (input) =>
  makeConfig(input)
    .flat(Infinity)
    .map((config, index) => ({ index, ...config }));

module.exports = configurize;
