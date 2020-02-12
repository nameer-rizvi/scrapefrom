const axios = require("axios");
const { cheerio } = require("../shared/index");

module.exports = (searchTerms, { api, selector }) => {
  const getSearchTerms = searchTerms.map(searchTerm => {
    return axios.get(api.url, { params: api.params(searchTerm) });
  });

  return new Promise((resolve, reject) => {
    axios
      .all(getSearchTerms)
      .then(
        axios.spread((...responses) => {
          const htmls = responses.map(response => {
            return response.data;
          });

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
      .catch(err => reject(err.message));
  });
};
