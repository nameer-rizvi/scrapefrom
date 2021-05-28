const scrapefrom = require("./index");

scrapefrom({
  url: "https://dcmusic.live/",
  extracts: [
    {
      json: true,
      name: "organization_logos",
      filter: (json) => json["@type"] === "Organization",
      keyMap: { site_logo: "logo" },
    },
  ],
}).then(console.log);
