const { clone } = require("simpul");

const mapKeys = (response, keyMap) =>
  Object.keys(keyMap).reduce((reducer, key) => {
    reducer[key] = keyMap[key]
      .split(".")
      .reduce((o, i) => o && o[i], clone(response));

    return reducer;
  }, {});

module.exports = mapKeys;
