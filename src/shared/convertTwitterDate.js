module.exports = timestampText => {
  return timestampText.split(" ").length === 1
    ? (() => {
        const split = timestampText.match(/[a-z]+|[^a-z]+/gi);

        var num = Number(split[0]);

        const measurement = split[1];

        num =
          measurement === "m"
            ? num * 60000
            : measurement === "h"
            ? num * 3600000
            : num;

        const time = new Date().getTime() - num;

        return time;
      })()
    : (() => {
        const currentYear = new Date().getFullYear();

        return new Date(`${timestampText} ${currentYear}`);
      })();
};