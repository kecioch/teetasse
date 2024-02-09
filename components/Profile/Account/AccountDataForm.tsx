"use client";

import LoadingButton from "@/components/UI/Buttons/LoadingButton";
import useFetch from "@/hooks/useFetch";
import { User } from "@/types/user";
import { Label, TextInput } from "flowbite-react";
import { useSession } from "next-auth/react";
import React from "react";
import { useForm } from "react-hook-form";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
}

interface Props {
  user: User;
  className?: string;
}

const AccountDataForm = ({ user, className }: Props) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>();

  const { update } = useSession();

  const { errorMsg, isFetching, fetch, clearErrorMsg } = useFetch();

  const onSubmit = async (data: FormData) => {
    const res = await fetch.put("/api/users/" + user.id, {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
    });
    if (res.data.code === "EMAIL_TAKEN") {
      clearErrorMsg();
      setError("email", { message: "Email ist bereits vergeben" });
    }
    if (res.status === 200) {
      console.log("UPDATET USER");
      update({
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
      });
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
            htmlFor="firstName"
            value="Vorname"
            color={errors.firstName && "failure"}
          />
        </div>
        <TextInput
          id="firstName"
          type="text"
          placeholder="Vorname"
          defaultValue={user.firstName}
          color={errors.firstName && "failure"}
          {...register("firstName", {
            required: "Vorname wird benötigt",
          })}
        />
        {errors.firstName && (
          <p className="text-red-700 font-light text-sm">
            {errors.firstName.message}
          </p>
        )}
      </div>
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="lastName"
            value="Nachname"
            color={errors.lastName && "failure"}
          />
        </div>
        <TextInput
          id="lastName"
          type="text"
          placeholder="Nachname"
          defaultValue={user.lastName}
          color={errors.lastName && "failure"}
          {...register("lastName", {
            required: "Nachname wird benötigt",
          })}
        />
        {errors.lastName && (
          <p className="text-red-700 font-light text-sm">
            {errors.lastName.message}
          </p>
        )}
      </div>
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
          defaultValue={user.email}
          color={errors.email && "failure"}
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
      {errorMsg && <p className="text-red-700 font-light">{errorMsg}</p>}

      <div className="w-full mt-5">
        <LoadingButton
          type="submit"
          color="success"
          className="w-full"
          isLoading={isFetching}
        >
          Änderungen speichern
        </LoadingButton>
      </div>
    </form>
  );
};

export default AccountDataForm;
