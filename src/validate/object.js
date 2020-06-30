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

  // const validateFollow = (follow) => {
  //   !isObject(follow) && error("config.selector.follow must be an object");
  //   !isObjectValid(follow) &&
  //     error("config.selector.follow is an empty object");
  //   const { href, selector: followSelector } = follow;
  //   !href && error("config.selector.follow.href is null or undefined");
  //   !isString(href) && error("config.selector.follow.href must be a string");
  //   !isStringValid(href) &&
  //     error("config.selector.follow.href is an empty string");
  //   validateSelector(followSelector, "config.selector.follow.selector");
  // };

  const validateSelector = (_selector, source) => {
    !_selector && error(`${source} is null or undefined`);
    !isObject(_selector) && error(`${source} must be an object`);
    const { container, text, attr, follow } = _selector;
    !container && error(`${source}.container is null or undefined`);
    !isString(container) && error(`${source}.container must be a string`);
    !isStringValid(container) &&
      error(`${source}.container is an empty string`);
    !text &&
      !attr &&
      // !follow &&
      error(`${source} requires a 'text' and/or 'attr' propery`);
    text && validateText(text);
    attr && validateAttr(attr);
    // follow && validateFollow(follow);
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
  !structured && validateSelector(selector, "config.selector");
  !selector && validateStructured();
};
