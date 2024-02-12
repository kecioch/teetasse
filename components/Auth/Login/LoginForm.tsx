"use client";

import LoadingButton from "@/components/UI/Buttons/LoadingButton";
import { LoginFormType } from "@/types/loginForm";
import { FloatingLabel } from "flowbite-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const LoginForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<LoginFormType>();

  const onSubmit = async (data: LoginFormType) => {
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
    } else {
      router.push("/profile");
      router.refresh();
    }
  };

  return (
    <div className="bg-gray-50 w-[90%] max md:max-w-[28em] py-7 rounded-xl shadow-[5px_5px_rgba(3,_84,_63,_0.4),_10px_10px_rgba(3,_84,_63,_0.3),_15px_15px_rgba(3,_84,_63,_0.2),_20px_20px_rgba(3,_84,_63,_0.1),_25px_25px_rgba(3,_84,_63,_0.05)]">
      <h2 className="text-center text-2xl uppercase mb-5 border-b pb-5 border-gray-300 text-green-700">
        Login
      </h2>
      <form
        className="flex w-full flex-col gap-4 px-7"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <FloatingLabel
            className="text-lg font-light"
            variant="standard"
            label="Email"
            type="email"
            color={errors.email ? "error" : "success"}
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
          <FloatingLabel
            className="text-lg font-light"
            variant="standard"
            label="Passwort"
            type="password"
            color={errors.password ? "error" : "success"}
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
          className="mt-3 p-1"
          color="success"
          isLoading={isLoading}
          pill
        >
          Einloggen
        </LoadingButton>
        <p className="font-light text-center mt-3 text-sm">
          Noch nicht registriert?{" "}
          <Link href="/register" className="text-green-600">
            Jetzt Registrieren
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
