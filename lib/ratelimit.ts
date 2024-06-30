import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

type Duration =
  | `${number} ms`
  | `${number} s`
  | `${number} m`
  | `${number} h`
  | `${number} d`
  | `${number}ms`
  | `${number}s`
  | `${number}m`
  | `${number}h`
  | `${number}d`;

export default function RateLimit(token: number, duration: Duration) {
  return new Ratelimit({
    redis: redis,
    limiter: Ratelimit.fixedWindow(token, duration),
  });
}
