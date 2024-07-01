import { redirect } from "next/dist/server/api-utils";

export default function AuthLogoutLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
