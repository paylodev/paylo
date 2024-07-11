import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("client.auth.register.layout.metadata");

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function AuthRegisterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
