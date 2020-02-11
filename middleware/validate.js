const {
  log,
  exists,
  isArray,
  isString,
  isStringEmpty,
  isArrayEmpty
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

    searchString && isStringEmpty(search) && error("Search is blank");

    searchArray &&
      isArrayEmpty(search) &&
      error("Array of search terms is empty");

    var formattedSearch = searchString
      ? search.split(",").map(term => term.trim())
      : searchArray
      ? search
      : [];

    formattedSearch = formattedSearch.filter(term => {
      return isString(term) && term.trim();
    });

    isArrayEmpty(formattedSearch)
      ? error("All search terms are empty or blank")
      : resolve(formattedSearch);
  });
};
