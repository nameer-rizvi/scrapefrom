module.exports = (data, convertTime) => {
  convertTime &&
    Object.keys(data).forEach(search =>
      data[search].forEach(
        item => item.time && (item.time = convertTime(item.time))
      )
    );
};
