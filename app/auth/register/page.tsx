"use client";

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
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { regex } from "@/lib/regex";

export default function AuthRegister() {
  const t = useTranslations("client.auth.register");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <Stack>
        <BrandLogo type={"icon"} color={"black"} width={30} />
        <Title order={2}>{t("title")}</Title>
        <Group grow>
          <TextInput
            autoFocus
            label={t("firstName.label")}
            placeholder={t("firstName.placeholder")}
            {...register("firstName", {
              required: t("requiredField"),
            })}
            error={
              errors.firstName && (
                <ErrorMessage errors={errors} name="firstName" />
              )
            }
          />
          <TextInput
            label={t("lastName.label")}
            placeholder={t("lastName.placeholder")}
            {...register("lastName", {
              required: t("requiredField"),
            })}
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
            required: t("requiredField"),
            pattern: {
              value: regex.email,
              message: t("email.invalid"),
            },
          })}
          error={errors.email && <ErrorMessage errors={errors} name="email" />}
        />
        <PasswordInput
          label={t("password.label")}
          placeholder={t("password.placeholder")}
          {...register("password", {
            required: t("requiredField"),
            pattern: {
              value: regex.password,
              message: t("password.invalid"),
            },
          })}
          error={
            errors.password && <ErrorMessage errors={errors} name="password" />
          }
        />
        <Checkbox
          label={t("terms")}
          {...register("terms", { required: t("requiredField") })}
          error={errors.terms && <ErrorMessage errors={errors} name="terms" />}
        />
        <Button type={"submit"}>{t("submit")}</Button>
        <Text ta={"center"}>
          {t("alreadyHaveAccount")} <a href={"/auth/login"}>{t("login")}</a>
        </Text>
      </Stack>
    </form>
  );
}
