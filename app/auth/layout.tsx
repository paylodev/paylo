import styles from "@/styles/auth/layout.module.css";
import { Card } from "@mantine/core";

export default async function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <Card className={styles.Container}>{children}</Card>;
}
