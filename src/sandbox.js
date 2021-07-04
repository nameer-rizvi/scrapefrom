const scrapefrom = require("./index");

// scrapefrom({
//   url: "https://api.dcmusic.live/app/initialize",
//   extractor: (json) => ({ silver_metroline_color: json.metrolines[1].color }),
// }).then((r) => console.log(r.result));

const unionstageScraper = ({ venue = "UNION STAGE" }) => ({
  use: "puppeteer",
  logFetch: true,
  url: "https://www.unionstage.com/",
  waitForSelector: "select.venue-select",
  selectDropdown: ["select.venue-select", venue],
  extract: {
    selector: "div[class='tessera-show-card']", // we need the exact class match because they add an extra class on hidden divs
    name: "events",
    extracts: [
      { name: "date", selector: "div.tessera-date" },
      { name: "time", selector: "span.tessera-showTimes" },
      { name: "title", selector: "h4" },
      { name: "ageRestriction", selector: "span.tessera-showAges" },
      { name: "description", selector: "div.tessera-additionalArtists" },
      { name: "eventLink", selector: "a.more-info", attribute: "href" },
      { name: "location", select: "span.tessera-venue" },
    ],
  },
});

scrapefrom([
  // unionstageScraper({ venue: "CAPITAL TURNAROUND" }),
  // unionstageScraper({ venue: "MIRACLE THEATRE" }),
  unionstageScraper({ venue: "UNION STAGE" }),
])
  .then((response) => console.log(response.result.events))
  .catch(console.log);
