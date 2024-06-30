"use client";

import {
  Button,
  Checkbox,
  Group,
  PasswordInput,
  Stack,
  TextInput,
  Title,
  Text,
} from "@mantine/core";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function AuthRegister() {
  const t = useTranslations("client.auth.register");
  return (
    <Stack>
      <Title order={2}>{t("title")}</Title>
      <Group grow>
        <TextInput
          label={t("firstName.label")}
          placeholder={t("firstName.placeholder")}
        />
        <TextInput
          label={t("lastName.label")}
          placeholder={t("lastName.placeholder")}
        />
      </Group>
      <TextInput
        label={t("email.label")}
        placeholder={t("email.placeholder")}
      />
      <PasswordInput
        label={t("password.label")}
        placeholder={t("password.placeholder")}
      />
      <Checkbox label={t("terms")} />
      <Button type={"submit"}>{t("submit")}</Button>
      <Text ta={"center"}>
        {t("haveAccount")} <Link href={"/auth/login"}>{t("login")}</Link>
      </Text>
    </Stack>
  );
}
