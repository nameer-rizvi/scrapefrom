const { convertTwitterDate, cheerio } = require("./fn/index");

module.exports = ({ htmls, searchTerms }, { container, text, attr }) => {
  const data = {};

  htmls.forEach((html, index) => {
    data[searchTerms[index]] = cheerio({ html, container, text, attr });
  });

  return data;
};
