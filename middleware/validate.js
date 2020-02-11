const {
  log,
  exists,
  isArray,
  isString,
  isStringEmpty,
  isArrayEmpty,
  areArrayValuesAllStrings
} = require("./fn/index");

module.exports = search => {
  return new Promise((resolve, reject) => {
    const error = msg => reject(log(msg));

    const searchString = isString(search);
    const searchArray = isArray(search);

    !exists(search) && error("Missing search");

    !searchString &&
      !searchArray &&
      error("Search must be a string or an array of strings");

    searchString && isStringEmpty(searchString) && error("Search is blank");

    searchArray &&
      isArrayEmpty(searchArray) &&
      error("Array of search terms is empty");

    var formattedSearch = searchString
      ? search.split(",")
      : searchArray
      ? search
      : [];

    formattedSearch = formattedSearch.filter(term => {
      return !isStringEmpty(term);
    });

    isArrayEmpty(formattedSearch)
      ? error("All search terms are empty or blank")
      : resolve(formattedSearch);
  });
};
