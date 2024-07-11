import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata() {
  const t = await getTranslations("client.root.layout.metadata");
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const lang = await getLocale();
  const locales = await getMessages();

  return (
    <html lang={lang}>
      <body className={inter.className}>
        <NextIntlClientProvider messages={locales}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
