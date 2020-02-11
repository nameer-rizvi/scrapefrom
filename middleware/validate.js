const {
  log,
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

    !search && error("Missing search");

    !searchString &&
      !searchArray &&
      error("Search must be a string or an array of strings");

    searchString && isStringEmpty(search) && error("Search is blank");

    searchArray &&
      isArrayEmpty(search) &&
      error("Array of search terms is empty");

    const arr = searchString ? search.split(",") : searchArray ? search : [];

    var filtered = [];

    !isArrayEmpty(arr) &&
      arr.forEach(term => {
        return !isStringEmpty(term) && filtered.push(term.trim());
      });

    isArrayEmpty(filtered)
      ? error("All search terms are empty or blank")
      : resolve(filtered);
  });
};
