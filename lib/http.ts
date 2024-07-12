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

export { createErrorResponse };
