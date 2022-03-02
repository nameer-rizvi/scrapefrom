const dottpath = require("dottpath");

function keyPathExtraction(keyPath, json) {
  const result = {};

  for (let key in keyPath) result[key] = dottpath.extract(json, keyPath[key]);

  return result;
}

module.exports = keyPathExtraction;
