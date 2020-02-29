const axios = require("axios");
const { cheerio } = require("../shared/index");

module.exports = (searchTerms, age, api, selector) => {
  const getSearchTerms = searchTerms.map(searchTerm =>
    axios.get(api.url, { params: api.params(searchTerm, age) })
  );

  return new Promise((resolve, reject) =>
    axios
      .all(getSearchTerms)
      .then(
        axios.spread((...responses) => {
          const htmls = responses.map(response => response.data);

          const data = {};

          const { container, text, attr } = selector;

          htmls.forEach((html, index) => {
            data[searchTerms[index]] = cheerio({
              html,
              container,
              text,
              attr
            });
          });

          resolve(data);
        })
      )
      .catch(err => reject(err.message))
  );
};
