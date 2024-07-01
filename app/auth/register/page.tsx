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
import styles from "@/styles/auth/register/page.module.css";
import { useForm } from "react-hook-form";
import { emailRegex, passwordRegex } from "@/lib/common";
import { ErrorMessage } from "@hookform/error-message";
import AuthRegisterAction from "@/actions/auth/register";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";

export default function AuthRegister() {
  const t = useTranslations("client.auth.register");
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();
  const router = useRouter();
  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        const res = await AuthRegisterAction(
          data as {
            firstName: string;
            lastName: string;
            email: string;
            password: string;
            terms: boolean;
          }
        );
        switch (res.message) {
          case "ERR_MISSING_FIELDS":
            for (const field of res.data.fields as string[]) {
              setError(field, { message: t("fieldRequired") });
            }
            break;

          case "ERR_INVALID_EMAIL":
            setError("email", { message: t("email.invalid") });
            break;

          case "ERR_INVALID_PASSWORD":
            setError("password", { message: t("password.invalid") });
            break;

          case "ERR_EMAIL_EXISTS":
            setError("email", { message: t("email.alreadyExists") });
            break;

          case "ERR_RATE_LIMIT":
            notifications.show({
              title: t("rateLimit.title"),
              message: t("rateLimit.message"),
              color: "red",
            });
            break;

          case "ERR_INTERNAL_SERVER":
            notifications.show({
              title: t("serverError.title"),
              message: t("serverError.message"),
              color: "red",
            });
            break;

          case "OK":
            router.push("/auth/verify");
        }
      })}
    >
      <Stack>
        <Title order={2}>{t("title")}</Title>
        <Group grow className={styles.Group}>
          <TextInput
            autoFocus
            label={t("firstName.label")}
            placeholder={t("firstName.placeholder")}
            {...register("firstName", { required: t("fieldRequired") })}
            error={
              errors.firstName && (
                <ErrorMessage errors={errors} name="firstName" />
              )
            }
          />
          <TextInput
            label={t("lastName.label")}
            placeholder={t("lastName.placeholder")}
            {...register("lastName", { required: t("fieldRequired") })}
            error={
              errors.lastName && (
                <ErrorMessage errors={errors} name="lastName" />
              )
            }
          />
        </Group>
        <TextInput
          label={t("email.label")}
          placeholder={t("email.placeholder")}
          {...register("email", {
            required: t("fieldRequired"),
            pattern: {
              value: emailRegex,
              message: t("email.invalid"),
            },
          })}
          error={errors.email && <ErrorMessage errors={errors} name="email" />}
        />
        <PasswordInput
          label={t("password.label")}
          placeholder={t("password.placeholder")}
          {...register("password", {
            required: t("fieldRequired"),
            pattern: {
              value: passwordRegex,
              message: t("password.invalid"),
            },
          })}
          error={
            errors.password && <ErrorMessage errors={errors} name="password" />
          }
        />
        <Checkbox
          label={t("terms")}
          {...register("terms", { required: t("fieldRequired") })}
          error={errors.terms && <ErrorMessage errors={errors} name="terms" />}
        />
        <Button type={"submit"} loading={isSubmitting}>
          {t("submit")}
        </Button>
        <Text ta={"center"}>
          {t("haveAccount")} <Link href={"/auth/login"}>{t("login")}</Link>
        </Text>
      </Stack>
    </form>
  );
}
