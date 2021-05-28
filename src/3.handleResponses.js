const handleResponses = ({ responses, configs }) =>
  new Promise((resolve) => {
    responses.forEach((response, index) => {
      if (response.status === "fulfilled") {
        configs[index].response = response.value;
      } else if (response.reason)
        configs[index].error = response.reason.toString();
    });

    resolve(configs);
  });

module.exports = handleResponses;
