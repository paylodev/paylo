import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export function GET(req: NextRequest) {
  cookies().delete("oneSessionId");
  redirect("/auth/login");
}
