const dottpath = require("dottpath");

function keyPathExtraction(keyPath, json) {
  const result = {};

  for (const key in keyPath) result[key] = dottpath.extract(json, keyPath[key]);

  return result;
}

module.exports = keyPathExtraction;
