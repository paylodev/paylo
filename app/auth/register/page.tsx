import BrandLogo from "@/components/BrandLogo";
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

export default function AuthRegister() {
  const t = useTranslations("client.auth.register");

  return (
    <Stack>
      <BrandLogo type={"icon"} color={"black"} width={30} />
      <Title order={2}>{t("title")}</Title>
      <Group grow>
        <TextInput
          autoFocus
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
      <Button>{t("submit")}</Button>
      <Text ta={"center"}>
        {t("alreadyHaveAccount")} <a href={"/auth/login"}>{t("login")}</a>
      </Text>
    </Stack>
  );
}
