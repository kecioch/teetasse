"use client";

import { Button, Label, TextInput } from "flowbite-react";
import React from "react";
import { useForm } from "react-hook-form";

export interface GuestFormType {
  firstName: string;
  lastName: string;
  email: string;
}

interface Props {
  onSubmit: (data: GuestFormType) => void;
}

const GuestForm = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<GuestFormType>();

  const onSubmitHandler = (data: GuestFormType) => {
    onSubmit(data);
  };

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit(onSubmitHandler)}
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
          color={errors.firstName && "error"}
          {...register("firstName", { required: "Vorname wird benötigt" })}
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
          color={errors.lastName && "error"}
          {...register("lastName", { required: "Nachname wird benötigt" })}
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
            htmlFor="guest_email"
            value="Email"
            color={errors.email && "failure"}
          />
        </div>
        <TextInput
          id="guest_email"
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
      <Button size="lg" color="success" type="submit" className="w-full mt-2">
        Weiter
      </Button>
    </form>
  );
};

export default GuestForm;
