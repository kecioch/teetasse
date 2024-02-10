"use client";

import LoadingButton from "@/components/UI/Buttons/LoadingButton";
import useFetch from "@/hooks/useFetch";
import { User } from "@/types/user";
import { Label, TextInput } from "flowbite-react";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";

interface PasswordFormData {
  password: string;
  passwordRepeat: string;
}

interface Props {
  user: User;
  beforeSubmit: () => void;
  afterSubmit: () => void;
  disabled: boolean;
}

const PasswordStaffForm = ({
  user,
  disabled,
  beforeSubmit,
  afterSubmit,
}: Props) => {
  const { fetch, errorMsg, isFetching, clearErrorMsg } = useFetch();

  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm<PasswordFormData>();

  const password = useRef({});
  password.current = watch("password", "");

  const handleUpdatePassword = async (data: PasswordFormData) => {
    console.log(data);
    beforeSubmit();

    const res = await fetch.put("/api/users/" + user.id + "/password", {
      password: data.password,
    });
    if (res.status === 200) {
      console.log("UPDATET Passwort");
    }
    afterSubmit();
  };

  return (
    <form
      className="flex w-full flex-col gap-4"
      onSubmit={handleSubmit(handleUpdatePassword)}
    >
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
      <LoadingButton
        color="success"
        type="submit"
        className="mt-5"
        isLoading={isFetching}
        disabled={disabled && !isFetching}
      >
        Passwort ändern
      </LoadingButton>
    </form>
  );
};

export default PasswordStaffForm;
