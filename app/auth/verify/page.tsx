"use client";

import { Stack, Title, Text, PinInput, Button } from "@mantine/core";
import { useTranslations } from "next-intl";
import Link from "next/link";
import styles from "@/styles/auth/verify/page.module.css";
import { useState, useEffect } from "react";

export default function AuthVerify() {
  const t = useTranslations("client.auth.verify");
  const [email, setEmail] = useState("");

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/user/me");
      const data = await res.json();
      setEmail(data.data.email);
    })();
  }, []);
  return (
    <Stack>
      <Title order={2}>{t("title")}</Title>
      <Text>{t("description", { email })}</Text>
      <PinInput length={6} placeholder="•" className={styles.PinInput} />{" "}
      {/* TODO: Add submit handler */}
      <Button>{t("resend")}</Button>
      {/* TODO: Add resend handler */}
      <Text ta={"center"}>
        <Link href={"/auth/logout"}>{t("logout")}</Link>
      </Text>
    </Stack>
  );
}
