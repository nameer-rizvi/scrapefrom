const scrapefrom = require("./index");

scrapefrom({
  url:
    "https://www.trumba.com/calendars/smithsonian-events.json?filter1=_16645_&filter2=_16672_&filterfield1=11153&filterfield2=11165",
  extractor: (events) =>
    events
      .map((event) => {
        const { title, description, dateTimeFormatted, permaLinkUrl } =
          event || {};

        return {
          title,
          date: dateTimeFormatted,
          time: dateTimeFormatted,
          description,
          eventLink: permaLinkUrl,
        };
      })
      .flat()
      .filter(Boolean),
}).then(console.log);
