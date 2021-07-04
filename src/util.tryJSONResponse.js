function tryJSONResponse(response) {
  try {
    const responseJSON = JSON.parse(response);
    return responseJSON;
  } catch {
    return response;
  }
}

module.exports = tryJSONResponse;
