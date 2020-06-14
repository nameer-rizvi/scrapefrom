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

  const validateApi = () => {
    !api && error("config.api is null or undefined");
    !isObject(api) && error("config.api must be an object");
    const { url, params } = api;
    !url && error("config.api.url is null or undefined");
    !isString(url) && error("config.api.url must be a string");
    !isStringValid(url) && error("config.api.url is an empty string");
    params && !isObject(params) && error("config.api.params must be an object");
  };

  const validateText = (text) => {
    !isObject(text) && error("config.selector.text must be an object");
    !isObjectValid(text) && error("config.selector.text is an empty object");
    !areObjectValuesAllStrings(text) &&
      error(
        "config.selector.text object values must all be strings with values"
      );
  };

  const validateAttr = (attr) => {
    !isObject(attr) && error("config.selector.attr must be an object");
    !isObjectValid(attr) && error("config.selector.attr is an empty object");
    !areObjectValuesAllObjects(attr) &&
      error(
        "config.selector.attr must contain named objects with 'selector' and 'attr' properties"
      );
    !Object.keys(attr).every((key) => {
      const childKeys = Object.keys(attr[key]);
      return (
        childKeys &&
        childKeys.includes("selector") &&
        childKeys.includes("attr")
      );
    }) &&
      error(
        "config.selector.attr objects must contain 'selector' and 'attr' properties"
      );
    !Object.keys(attr).every((key) => areObjectValuesAllStrings(attr[key])) &&
      error("config.selector.attr objects must contain string values");
  };

  const validateSelector = () => {
    !selector && error("config.selector is null or undefined");
    !isObject(selector) && error("config.selector must be an object");
    const { container, text, attr } = selector;
    !container && error("config.selector.container is null or undefined");
    !isString(container) && error("config.selector.container must be a string");
    !isStringValid(container) &&
      error("config.selector.container is an empty string");
    !text &&
      !attr &&
      error("config.selector requires a 'text' and/or 'attr' property");
    text && validateText(text);
    attr && validateAttr(attr);
  };

  const validateStructured = () => {
    !structured && error("config.structured is null or undefined");
    !isObject(structured) && error("config.structured must be an object");
    const { type, mapper } = structured;
    !type && error("config.structured.type is null or undefined");
    !isString(type) && error("config.structured.type must be a string");
    !isStringValid(type) && error("config.structured.type is an empty string");
    !mapper && error("config.structured.mapper is null or underined");
    !isObject(mapper) && error("config.structured.mapper must be an object");
    !isObjectValid(mapper) &&
      error("config.structured.mapper is an empty object");
    !areObjectValuesAllStrings(mapper) &&
      error(
        "config.structured.mapper object values must all be strings with values"
      );
  };

  validateApi();
  !structured && validateSelector();
  !selector && validateStructured();
};
