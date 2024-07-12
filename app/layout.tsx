import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

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
      <head>
        <ColorSchemeScript />
      </head>
      <body className={inter.className}>
        <NextIntlClientProvider messages={locales}>
          <MantineProvider
            theme={{ primaryColor: "dark", defaultRadius: "md" }}
          >
            <Notifications autoClose={5000} position={"top-right"} />
            {children}
          </MantineProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
