const simpul = require("simpul");

function configurize(input) {
  const configs = parseConfigs(input).flat(Infinity);
  for (let i = 0; i < configs.length; i++) configs[i].index = i;
  return configs;
}

function parseConfigs(input) {
  if (simpul.isString(input)) {
    return [{ url: input }];
  } else if (simpul.isArray(input)) {
    const configs = [];
    for (let i of input) configs.push(parseConfigs(i));
    return configs;
  } else return [input];
}

module.exports = configurize;
