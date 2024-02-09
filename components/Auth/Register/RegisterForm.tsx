"use client";

import LoadingButton from "@/components/UI/Buttons/LoadingButton";
import useFetch from "@/hooks/useFetch";
import { Button, FloatingLabel } from "flowbite-react";
import { signIn } from "next-auth/react";
import React, { ChangeEvent, FormEvent, useRef, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

interface RegisterFormType {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  passwordRepeat: string;
}

const RegisterForm = () => {
  const { errorMsg, isFetching, fetch, clearErrorMsg } = useFetch();

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<RegisterFormType>();

  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = async (data: RegisterFormType) => {
    console.log("ONSUBMIT", data);
    const res = await fetch.post("/api/auth/register", data);
    console.log(res);
    if (res.data.code === "EMAIL_TAKEN") {
      clearErrorMsg();
      setError("email", { message: "Email ist bereits vergeben" });
    }
    if (res.status === 200) {
      await signIn("credentials", {
        email: data.email,
        password: data.password,
        callbackUrl: "/profile",
      });
    }
  };

  return (
    <div className="bg-gray-50 w-[90%] md:max-w-[32em] py-7 rounded-xl shadow-[5px_5px_rgba(3,_84,_63,_0.4),_10px_10px_rgba(3,_84,_63,_0.3),_15px_15px_rgba(3,_84,_63,_0.2),_20px_20px_rgba(3,_84,_63,_0.1),_25px_25px_rgba(3,_84,_63,_0.05)]">
      <h2 className="text-center text-2xl uppercase mb-5 border-b pb-5 border-gray-300 text-green-700">
        Registrieren
      </h2>
      <form
        className="flex w-full flex-col gap-4 px-7"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <FloatingLabel
            className="text-lg font-light"
            variant="standard"
            label="Vorname"
            type="text"
            color={errors.firstName ? "error" : "success"}
            {...register("firstName", { required: "Vorname wird benötigt" })}
          />
          {errors.firstName && (
            <p className="text-red-700 font-light text-sm">
              {errors.firstName.message}
            </p>
          )}
        </div>
        <div>
          <FloatingLabel
            className="text-lg font-light"
            variant="standard"
            label="Nachname"
            type="text"
            color={errors.lastName ? "error" : "success"}
            {...register("lastName", { required: "Nachname wird benötigt" })}
          />
          {errors.lastName && (
            <p className="text-red-700 font-light text-sm">
              {errors.lastName.message}
            </p>
          )}
        </div>
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
            {...register("password", {
              required: "Passwort wird benötigt",
              minLength: {
                value: 8,
                message: "Passwort benötigt mindestens 8 Zeichen",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-700 font-light text-sm">
              {errors.password.message}
            </p>
          )}
        </div>
        <div>
          <FloatingLabel
            className="text-lg font-light"
            variant="standard"
            label="Passwort wiederholen"
            type="password"
            color={errors.passwordRepeat ? "error" : "success"}
            {...register("passwordRepeat", {
              required: "Passwort wird benötigt",
              validate: (value) =>
                value === password.current ||
                "Passwörter stimmen nicht überein",
            })}
          />
          {errors.passwordRepeat && (
            <p className="text-red-700 font-light text-sm">
              {errors.passwordRepeat.message}
            </p>
          )}
        </div>
        {errorMsg && <p className="text-red-700 font-light">{errorMsg}</p>}
        <LoadingButton
          type="submit"
          className="mt-3 p-1"
          color="success"
          isLoading={isFetching}
          pill
        >
          Registrieren
        </LoadingButton>
      </form>
    </div>
  );
};

export default RegisterForm;
