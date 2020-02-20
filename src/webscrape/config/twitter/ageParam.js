const { isNumber } = require("../../../shared/index");

module.exports = age => {
  const param = () => {
    const date = new Date();

    const since = new Date(date.setDate(date.getDate() - age));

    const format = num => (num < 10 ? `0${num}` : num);

    const month = format(since.getMonth() + 1);
    const day = format(since.getDate());
    const year = since.getFullYear();

    const YYYMMDD = `${year}-${month}-${day}`;

    return ` since:${YYYMMDD}`;
  };

  return isNumber(age) ? param() : "";
};
