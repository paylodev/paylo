import styles from "@/styles/auth/layout.module.css";
import Link from "next/link";
import { Card, Stack, Text } from "@mantine/core";
import { getTranslations } from "next-intl/server";
import BrandLogo from "@/components/BrandLogo";

export default async function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const t = await getTranslations("client.auth.layout");
  return <Card className={styles.Container}>{children}</Card>;
}
