const pearlStreetConfig = {
  api: "https://www.pearlstreetwarehouse.com/shows/",
  structured: {
    type: "Event",
    mapper: {
      type: "@type",
      date: "startDate",
      time: "startDate",
      title: "name",
      description: "description",
      ageRestriction: "typicalAgeRange",
      price: "offers.lowPrice",
      ticketLink: "offers.url",
      eventLink: "url",
    },
  },
};

module.exports = pearlStreetConfig;
