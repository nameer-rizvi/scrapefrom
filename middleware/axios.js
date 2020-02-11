const axios = require("axios");

module.exports = (searchTerms, api) => {
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

          resolve({ htmls, searchTerms });
        })
      )
      .catch(err => reject(err.message));
  });
};
