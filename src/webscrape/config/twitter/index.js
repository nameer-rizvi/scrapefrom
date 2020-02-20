const ageParam = require("./ageParam");
const convertTime = require("./convertTime");

module.exports = {
  api: {
    url: "https://mobile.twitter.com/search?",
    params: (search, age) => {
      return {
        q: `${search} lang:en${ageParam(age)}`,
        s: "typd"
      };
    }
  },
  selector: {
    container: "table.tweet",
    text: {
      tweet: "div.tweet-text",
      user: "div.username",
      time: "td.timestamp a"
    },
    attr: {
      link: {
        selector: "span.metadata a",
        attr: "href"
      }
    }
  },
  convertTime
};
