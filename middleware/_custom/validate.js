const {
  log,
  exists,
  isObject,
  isString,
  isStringEmpty,
  isObjectEmpty,
  areObjectValuesAllStrings,
  areObjectValuesAllObjects
} = require("../fn/index");

module.exports = customConfig => {
  return new Promise((resolve, reject) => {
    const error = msg => reject(log(msg));

    !exists(customConfig) && error("Custom config object is required");

    !isObject(customConfig) && error("Custom config must be an object");

    const { api } = customConfig;

    !exists(api) && error("Custom config requires an api object with a url");

    !isObject(api) && error("Custom config api must be an object");

    const { url, params } = api;

    !exists(url) && error("Custom config api requires a url");

    !isString(url) && error("Custom config api url must be a string");

    isStringEmpty(url) &&
      error("Custom config api url can't be an empty string");

    exists(params) &&
      (() => {
        !isObject(params) &&
          error("Custom config api params must be an object");

        !areObjectValuesAllStrings(params) &&
          error("Custom config api params values must all be strings");
      })();

    const { selector } = customConfig;

    !exists(selector) &&
      error(
        "Custom config requires a selector object with a container string and a text and/or attr object"
      );

    !isObject(selector) && error("Custom config selector must be an object");

    const { container, text, attr } = selector;

    !exists(container) &&
      error("Custom config selector requires a container string");

    !isString(container) &&
      error("Custom config selector container must be a string");

    isStringEmpty(container) &&
      error("Custom config selector container must not be an empty string");

    !exists(text) &&
      !exists(attr) &&
      error("Custom config selector requires a text and/or attr object");

    exists(text) &&
      (() => {
        !isObject(text) &&
          error("Custom config selector text must be an object");

        isObjectEmpty(text) &&
          error("Custom config selector text must not be an empty object");

        !areObjectValuesAllStrings(text) &&
          error(
            "Custom config selector text object values must all be strings"
          );
      })();

    exists(attr) &&
      (() => {
        !isObject(attr) &&
          error("Custom config selector attr must be an object");

        isObjectEmpty(attr) &&
          error("Custom config selector attr must not be an empty object");

        !areObjectValuesAllObjects(attr) &&
          error(
            "Custom config selector attr must only contain objects with selector and attr strings"
          );

        !Object.keys(attr).every(key => {
          const childKeys = Object.keys(attr[key]);
          return (
            childKeys &&
            childKeys.includes("selector") &&
            childKeys.includes("attr")
          );
        }) &&
          error(
            "Custom config selector attr objects can't be empty and must contain string values for selector and attr"
          );

        !Object.keys(attr).every(key => {
          return areObjectValuesAllStrings(attr[key]);
        }) &&
          error(
            "Custom config selector attr objects can't be empty and must only contain string values for selector and attr"
          );
      })();

    resolve();
  });
};
