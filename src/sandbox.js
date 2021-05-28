const scrapefrom = require("./index");

scrapefrom({
  url: "https://api.dcmusic.live/app/initialize",
  extractor: (json) => ({ silver_metroline_color: json.metrolines[1].color }),
}).then(console.log);
