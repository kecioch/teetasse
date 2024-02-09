"use client";

import LoadingButton from "@/components/UI/Buttons/LoadingButton";
import useFetch from "@/hooks/useFetch";
import { User } from "@/types/user";
import { Label, TextInput } from "flowbite-react";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";

interface FormData {
  oldPassword: string;
  password: string;
  passwordRepeat: string;
}

interface Props {
  user: User;
  className?: string;
}

const PasswordForm = ({ user, className }: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<FormData>();

  const { errorMsg, isFetching, fetch, clearErrorMsg } = useFetch();

  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = async (data: FormData) => {
    const res = await fetch.put("/api/users/" + user.id + "/password", {
      password: data.password,
      oldPassword: data.oldPassword,
    });
    if (res.data.code === "OLDPASSWORD_INCORRECT") {
      clearErrorMsg();
      setError("oldPassword", {
        message: res.data.msg,
      });
    }
    if (res.status === 200) {
      console.log("UPDATET Passwort");
    }
  };
  return (
    <form
      className={`flex flex-col gap-4 ${className}`}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="oldPassword"
            value="Aktuelles Passwort"
            color={errors.oldPassword && "failure"}
          />
        </div>
        <TextInput
          id="oldPassword"
          type="password"
          placeholder="Aktuelles Passwort"
          color={errors.oldPassword && "failure"}
          {...register("oldPassword", {
            required: "Aktuelles Passwort wird benötigt",
          })}
        />
        {errors.oldPassword && (
          <p className="text-red-700 font-light text-sm">
            {errors.oldPassword.message}
          </p>
        )}
      </div>
      <div>
        <div className="mb-2 mt-1 block">
          <Label
            htmlFor="password"
            value="Neues Passwort"
            color={errors.password && "failure"}
          />
        </div>
        <TextInput
          id="password"
          type="password"
          placeholder="Neues Passwort"
          color={errors.password && "failure"}
          {...register("password", {
            required: "Neues Passwort wird benötigt",
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
        <div className="mb-2 block">
          <Label
            htmlFor="passwordRepeat"
            value="Neues Passwort wiederholen"
            color={errors.passwordRepeat && "failure"}
          />
        </div>
        <TextInput
          id="passwordRepeat"
          type="password"
          placeholder="Neues Passwort wiederholen"
          color={errors.passwordRepeat && "failure"}
          {...register("passwordRepeat", {
            required: "Passwort wird benötigt",
            validate: (value) =>
              value === password.current || "Passwörter stimmen nicht überein",
          })}
        />
        {errors.passwordRepeat && (
          <p className="text-red-700 font-light text-sm">
            {errors.passwordRepeat.message}
          </p>
        )}
      </div>
      {errorMsg && <p className="text-red-700 font-light">{errorMsg}</p>}

      <div className="w-full mt-5">
        <LoadingButton
          type="submit"
          color="success"
          className="w-full"
          isLoading={isFetching}
        >
          Passwort ändern
        </LoadingButton>
      </div>
    </form>
  );
};

export default PasswordForm;
