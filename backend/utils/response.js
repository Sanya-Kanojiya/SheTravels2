function sendSuccess(res, data = {}, message = "Operation successful", statusCode = 200) {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
}

function sendError(res, message = "Something went wrong", statusCode = 500) {
  return res.status(statusCode).json({
    success: false,
    message,
  });
}

module.exports = { sendSuccess, sendError };
