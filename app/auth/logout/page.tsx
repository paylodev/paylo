import { redirect } from "next/navigation";

export default function AuthLogout() {
  redirect("/api/auth/logout");
}
