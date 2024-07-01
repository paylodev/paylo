import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("client.auth.verify.layout.metadata");
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function AuthVerifyLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
