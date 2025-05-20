const sendResponse = (res, apiResponse) => {
  return res.status(apiResponse.statusCode).json(apiResponse);
};
