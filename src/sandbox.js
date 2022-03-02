const scrapefrom = require("./index");

scrapefrom({
  url: "",
  extract: {
    selector: "",
    name: "",
    extracts: [],
  },
})
  .then(
    (responses) => console.log(responses.result.events)
    // responses.forEach((response) => console.log(response.result.events))
  )
  .catch(console.log);
