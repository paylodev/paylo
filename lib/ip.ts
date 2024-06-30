import { headers } from "next/headers";

export function getIp() {
  return (
    headers().get("x-real-ip") || headers().get("x-forwarded-for") || "0.0.0.0"
  );
}
