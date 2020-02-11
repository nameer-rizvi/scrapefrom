module.exports = {
  api: {
    url: "https://mobile.twitter.com/search?",
    params: search => {
      return {
        q: `${search} lang:en`
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
  }
};
