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

export function verify(token: string) {
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as {
      [key: string]: any;
    };
    if (payload.exp && Date.now() >= payload.exp * 1000) {
      return null;
    } else {
      return payload;
    }
  } catch {
    return null;
  }
}
