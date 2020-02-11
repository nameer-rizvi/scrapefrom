const axios = require("axios");

module.exports = (searchTerms, api) => {
  const getSearchterms = searchTerms.map(searchTerm => {
    return axios.get(api.url, { params: api.params(searchTerm) });
  });

  return new Promise((resolve, reject) => {
    axios
      .all(getSearchterms)
      .then(
        axios.spread((...responses) => {
          const htmls = responses.map(response => {
            return response.data;
          });

          resolve({ htmls, searchTerms });
        })
      )
      .catch(err => reject(err));
  });
};
