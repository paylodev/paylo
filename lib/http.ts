export function createErrorResponse(
  code: number,
  message: string,
  data: { [key: string]: any } = {}
) {
  return {
    code,
    message,
    data,
  };
}

export function createSuccessResponse(data: { [key: string]: any } = {}) {
  return {
    code: 200,
    message: "OK",
    data,
  };
}
