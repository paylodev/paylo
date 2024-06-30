export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;"'<>,.?/~`\\\-]).{8,}$/;
export function getMissingFields(fields: Partial<{ [key: string]: any }>) {
  return Object.entries(fields)
    .filter(([, value]) => !value)
    .map(([key]) => key);
}
