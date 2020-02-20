module.exports = {
  isNumber: test => Boolean(test && !isNaN(test)),
  isArray: test => Boolean(test && test.constructor === Array),
  isString: test => Boolean(test && test.constructor === String),
  isObject: test => Boolean(test && test.constructor === Object),
  isArrayEmpty: test => !module.exports.isArray(test) || !test.length,
  isStringEmpty: test => !module.exports.isString(test) || !test.trim(),
  isObjectEmpty: test =>
    !module.exports.isObject(test) || !Object.keys(test).length,
  areArrayValuesAllStrings: test =>
    !module.exports.isArrayEmpty(test) &&
    test.every(value => {
      return module.exports.isString(value);
    }),
  areObjectValuesAllStrings: test =>
    !module.exports.isObjectEmpty(test) &&
    Object.keys(test).every(key => {
      return module.exports.isString(test[key]);
    }),
  areObjectValuesAllObjects: test =>
    !module.exports.isObjectEmpty(test) &&
    Object.keys(test).every(key => {
      return module.exports.isObject(test[key]);
    })
};
