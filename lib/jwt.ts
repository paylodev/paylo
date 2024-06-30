import jwt from "jsonwebtoken";

export function sign({
  payload,
  options,
}: {
  payload: { [key: string]: any };
  options?: jwt.SignOptions;
}) {
  return jwt.sign(payload, process.env.JWT_SECRET as string, options);
}
