function createErrorResponse(
  statusCode: number,
  message: string,
  data: { [key: string]: any } = {}
) {
  return {
    statusCode,
    message,
    data,
  };
}

function createSuccessResponse(data: { [key: string]: any } = {}) {
  return {
    statusCode: 200,
    message: "OK",
    data,
  };
}

export { createErrorResponse, createSuccessResponse };
