const {
  isString,
  isStringEmpty,
  isObject,
  isObjectEmpty,
  areObjectValuesAllStrings,
  areObjectValuesAllObjects,
} = require("./utils");

module.exports = (configObject, error) => {
  const { api, selector } = configObject;

  const validateApi = () => {
    !api && error("config.api is null or undefined");
    !isObject(api) && error("config.api must be an object");
    const { url, params } = api;
    !url && error("config.api.url is null or undefined");
    !isString(url) && error("config.api.url must be a string");
    isStringEmpty(url) && error("config.api.url is an empty string");
    params && !isObject(params) && error("config.api.params must be an object");
  };

  const validateText = (text) => {
    !isObject(text) && error("config.selector.text must be an object");
    isObjectEmpty(text) && error("config.selector.text is an empty object");
    !areObjectValuesAllStrings(text) &&
      error(
        "config.selector.text object values must all be strings with values"
      );
  };

  const validateAttr = (attr) => {
    !isObject(attr) && error("config.selector.attr must be an object");
    isObjectEmpty(attr) && error("config.selector.attr is an empty object");
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
    isStringEmpty(container) &&
      error("config.selector.container is an empty string");
    !text &&
      !attr &&
      error("config.selector requires a 'text' and/or 'attr' property");
    text && validateText(text);
    attr && validateAttr(attr);
  };

  validateApi();

  validateSelector();
};
