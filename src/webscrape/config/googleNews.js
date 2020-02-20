module.exports = {
  api: {
    url: "https://news.google.com/search",
    params: (search, age) => {
      const when = age && !isNaN(age) ? ` when:${age}d` : "";
      return {
        q: `${search}${when}`,
        hl: "en-US",
        gl: "US",
        ceid: "US:en"
      };
    }
  },
  selector: {
    container: "article",
    text: {
      headline: "h3",
      short: "span.xBbh9",
      source: "a.wEwyrc.AVN2gc.uQIVzc.Sksgp"
    },
    attr: {
      time: {
        selector: "time",
        attr: "datetime"
      },
      link: {
        selector: "a.VDXfz",
        attr: "href"
      }
    }
  },
  convertTime: time => time && new Date(time).getTime()
};
