"use server";

import { emailRegex, getMissingFields, passwordRegex } from "@/lib/common";
import { db } from "@/lib/db";
import { createErrorResponse, createSuccessResponse } from "@/lib/http";
import { getIp } from "@/lib/ip";
import { sign } from "@/lib/jwt";
import RateLimit from "@/lib/ratelimit";
import { log } from "@logtail/next";
import { hash } from "bcrypt";
import { cookies } from "next/headers";

export default async function AuthRegisterAction({
  firstName,
  lastName,
  email,
  password,
  terms,
}: Readonly<{
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  terms: boolean;
}>) {
  try {
    const ratelimit = await RateLimit(5, "60 s").limit(getIp());

    if (!ratelimit.success) {
      return createErrorResponse(429, "ERR_RATE_LIMIT");
    }

    if (getMissingFields({ firstName, lastName, email, password }).length > 0) {
      return createErrorResponse(400, "ERR_MISSING_FIELDS", {
        fields: getMissingFields({ firstName, lastName, email, password }),
      });
    }

    if (!emailRegex.test(email)) {
      return createErrorResponse(400, "ERR_INVALID_EMAIL");
    }

    if (!passwordRegex.test(password)) {
      return createErrorResponse(400, "ERR_INVALID_PASSWORD");
    }

    const existingUser = await db.user.findFirst({
      where: {
        email,
      },
    });

    if (existingUser) {
      return createErrorResponse(400, "ERR_EMAIL_EXISTS");
    }

    const user = await db.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: await hash(password, 10),
      },
    });

    const oneSessionId = sign({
      payload: {
        userId: user.id,
        action: "AUTH",
      },
      options: {
        expiresIn: "7d",
      },
    });

    cookies().set("oneSessionId", oneSessionId, {
      maxAge: 60 * 60 * 24 * 7,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    return createSuccessResponse();
  } catch (e: any) {
    log.error(`AuthRegisterAction (${e.message})`, {
      error: e,
      request: { firstName, lastName, email, password: "[REDACTED]", terms },
    });
    return {
      code: 500,
      message: "ERR_INTERNAL_SERVER",
      data: {},
    };
  }
}
