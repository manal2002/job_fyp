// Dynamically generate success response
function successResponse(message, data = {}) {
  return {
    status: 200,
    message: message,
    data: data,
  };
}

// Dynamically generate error response
function errorResponse(message, error = {}, status = 400) {
  return {
    status: status,
    message: message,
    detail: error.toString(),
  };
}

module.exports = { successResponse, errorResponse };
