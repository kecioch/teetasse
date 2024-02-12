"use client";

import LoadingButton from "@/components/UI/Buttons/LoadingButton";
import { LoginFormType } from "@/types/loginForm";
import { Label, TextInput } from "flowbite-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<LoginFormType>();

  const handleLogin = async (data: LoginFormType) => {
    setIsLoading(true);
    setErrorMsg("");
    clearErrors();
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    setIsLoading(false);
    if (!res?.ok && res?.error) {
      if (res?.error === "CredentialsSignin") {
        setErrorMsg("Email oder Passwort stimmen nicht überein");
        setError("email", {});
        setError("password", {});
      } else setErrorMsg("Fehlerhafter Loginversuch");
    }
  };

  return (
    <form
      className="flex w-full flex-col gap-4"
      onSubmit={handleSubmit(handleLogin)}
    >
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="email"
            value="Email"
            color={errors.email && "failure"}
          />
        </div>
        <TextInput
          id="email"
          type="email"
          placeholder="Email"
          color={errors.email && "error"}
          {...register("email", {
            required: "Email wird benötigt",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Email muss valide sein",
            },
          })}
        />
        {errors.email && (
          <p className="text-red-700 font-light text-sm">
            {errors.email.message}
          </p>
        )}
      </div>
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="password"
            value="Passwort"
            color={errors.password && "failure"}
          />
        </div>
        <TextInput
          id="password"
          type="password"
          placeholder="Passwort"
          color={errors.password && "error"}
          {...register("password", { required: "Passwort wird benötigt" })}
        />
        {errors.password && (
          <p className="text-red-700 font-light text-sm">
            {errors.password.message}
          </p>
        )}
      </div>

      {errorMsg && <p className="text-red-700 font-light">{errorMsg}</p>}
      <LoadingButton
        type="submit"
        color="dark"
        isLoading={isLoading}
        className="mt-2"
      >
        Einloggen
      </LoadingButton>
      <p className="font-light text-center text-sm">
        Noch nicht registriert?{" "}
        <Link href="/register" className="text-green-600">
          Jetzt Registrieren
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
