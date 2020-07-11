const {
  isString,
  isStringValid,
  isObject,
  isObjectValid,
  areObjectValuesAllStrings,
  areObjectValuesAllObjects,
} = require("./utils");

module.exports = (configObject, error) => {
  const { api, selector, structured } = configObject;

  const validateApi = (path) => {
    !api && error(`${path} is null or undefined`);
    !isObject(api) && error(`${path} must be an object`);
    const { url, params } = api;
    !url && error(`${path}.url is null or undefined`);
    !isString(url) && error(`${path}.url must be a string`);
    !isStringValid(url) && error(`${path}.url is an empty string`);
    params && !isObject(params) && error(`${path}.params must be an object`);
  };

  const validateText = (text, path) => {
    !isObject(text) && error(`${path} must be an object`);
    !isObjectValid(text) && error(`${path} is an empty object`);
    // !areObjectValuesAllStrings(text) &&
    //   error(`${path} object values must all be strings with valus`);
  };

  const validateAttr = (attr, path) => {
    !isObject(attr) && error(`${path} must be an object`);
    !isObjectValid(attr) && error(`${path} is an empty object`);
    !areObjectValuesAllObjects(attr) &&
      error(
        `${path} must contain named objects with 'selector' and 'attr' properties`
      );
    !Object.keys(attr).every((key) => {
      const childKeys = Object.keys(attr[key]);
      return (
        childKeys &&
        childKeys.includes("selector") &&
        childKeys.includes("attr")
      );
    }) &&
      error(`${path} objects must contain 'selector' and 'attr' properties`);
    !Object.keys(attr).every((key) => areObjectValuesAllStrings(attr[key])) &&
      error(`${path} objects must contain string values`);
  };

  const validateFollow = (follow, path) => {
    !isObject(follow) && error(`${path} must be an object`);
    !isObjectValid(follow) && error(`${path} is an empty object`);
    validateAttr(follow.api, `${path}.api`);
  };

  const validateSelector = (_selector, path) => {
    !_selector && error(`${path} is null or undefined`);
    !isObject(_selector) && error(`${path} must be an object`);
    const { container, text, attr, follow } = _selector;
    !container && error(`${path}.container is null or undefined`);
    !isString(container) && error(`${path}.container must be a string`);
    !isStringValid(container) && error(`${path}.container is an empty string`);
    !text &&
      !attr &&
      !follow &&
      error(`${path} requires a 'text'/'attr'/'follow' propery`);
    text && validateText(text, "config.selector.text");
    attr && validateAttr(attr, "config.selector.attr");
    follow && validateFollow(follow, "config.selector.follow");
  };

  const validateStructured = (_structured, path) => {
    !_structured && error(`${path} is null or undefined`);
    !isObject(_structured) && error(`${path} must be an object`);
    const { type, mapper } = _structured;
    !type && error(`${path}.type is null or undefined`);
    !isString(type) && error(`${path}.type must be a string`);
    !isStringValid(type) && error(`${path}.type is an empty string`);
    !mapper && error(`${path}.mapper is null or underined`);
    !isObject(mapper) && error(`${path}.mapper must be an object`);
    !isObjectValid(mapper) && error(`${path}.mapper is an empty object`);
    !areObjectValuesAllStrings(mapper) &&
      error(`${path}.mapper object values must all be strings with valus`);
  };

  validateApi("config.api");
  !structured && validateSelector(selector, "config.selector");
  !selector && validateStructured(structured, "config.structured");
};
