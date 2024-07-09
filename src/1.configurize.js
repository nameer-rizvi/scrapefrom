const simpul = require("simpul");

function configurize(input) {
  const configs = parseConfigs(input).flat(Infinity).filter(simpul.isObject);
  for (let i = 0; i < configs.length; i++) configs[i].index = i;
  return configs;
}

function parseConfigs(input) {
  if (simpul.isString(input)) {
    return [{ url: input }];
  } else if (simpul.isArray(input)) {
    return input.map(parseConfigs);
  } else return [input];
}

module.exports = configurize;
