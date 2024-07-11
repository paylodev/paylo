import { Card, Flex, Group, Stack, Text } from "@mantine/core";
import styles from "@/styles/auth/layout.module.css";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const t = await getTranslations("client.auth.layout");
  return (
    <Stack className={styles.Container}>
      <Card>{children}</Card>
      <Flex justify={"space-around"}>
        <Text size={"sm"} ta={"center"} c={"gray"}>
          <Link href={"/legal/terms"}>{t("terms")}</Link>
        </Text>
        <Text size={"sm"} ta={"center"} c={"gray"}>
          <Link href={"/legal/terms"}>{t("privacy")}</Link>
        </Text>
      </Flex>
    </Stack>
  );
}
