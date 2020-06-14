const html = require("./html");
const structuredDataScraper = require("../src/scraper/cheerioStructured");

test("structuredData is grabbed properly", () => {
  const config = {
    type: "Event",
    mapper: {
      type: "@type",
      title: "name",
      description: "description",
      date: "startDate",
      link: "url",
      price: "offers.price",
      img: "image",
    },
  };

  const result = structuredDataScraper(html, config);

  expect(result[0].type).toBe("Event");
});
