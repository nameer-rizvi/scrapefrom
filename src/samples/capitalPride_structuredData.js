const capitalPrideConfig = {
  api: {
    url: "https://www.capitalpride.org/events-365/",
  },
  structured: {
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
  },
};
