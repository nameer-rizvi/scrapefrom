const dottpath = require("dottpath");

function keyMapExtraction(keyMap, json) {
  const result = {};

  for (let resultKey in keyMap)
    result[resultKey] = dottpath.extract(json, keyMap[resultKey]);

  return result;
}

module.exports = keyMapExtraction;
