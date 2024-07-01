import { db } from "@/lib/db";
import { createErrorResponse, createSuccessResponse } from "@/lib/http";
import { verify } from "@/lib/jwt";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const oneSessionId = cookies().get("oneSessionId")?.value;
    if (!oneSessionId) {
      return NextResponse.json(createErrorResponse(401, "Unauthorized"));
    }

    const payload = verify(oneSessionId);
    if (!payload || payload.action !== "AUTH") {
      return NextResponse.json(createErrorResponse(401, "Unauthorized"));
    }

    const user = await db.user.findFirst({
      where: {
        id: payload.userId,
      },
    });

    if (!user) {
      return NextResponse.json(createErrorResponse(401, "Unauthorized"));
    }

    return NextResponse.json(
      createSuccessResponse({
        ...user,
        password: undefined,
      })
    );
  } catch (e: any) {
    return NextResponse.json(
      createErrorResponse(500, e.message || "Internal Server Error")
    );
  }
}
