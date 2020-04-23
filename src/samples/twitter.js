const twitterConfig = {
  api: {
    url: "https://mobile.twitter.com/search?",
    params: {
      q: `${search} lang:en`,
      s: "typd",
    },
  },
  selector: {
    container: "table.tweet",
    text: {
      tweet: "div.tweet-text",
      user: "div.username",
      time: "td.timestamp a",
    },
    attr: {
      link: {
        selector: "span.metadata a",
        attr: "href",
      },
    },
  },
};
