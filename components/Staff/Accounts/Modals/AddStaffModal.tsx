"use client";

import LoadingButton from "@/components/UI/Buttons/LoadingButton";
import useFetch from "@/hooks/useFetch";
import { User } from "@/types/user";
import { Role } from "@prisma/client";
import { Label, Modal, TextInput } from "flowbite-react";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordRepeat: string;
}

export interface Props {
  show: boolean;
  dismissible?: boolean;
  position?: string;
  onClose: () => void;
  onSubmit: (user: User) => void;
}

const AddStaffModal = ({
  show,
  dismissible = false,
  position = "top-center",
  onClose,
  onSubmit,
}: Props) => {
  const { fetch, errorMsg, isFetching, clearErrorMsg } = useFetch();

  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const password = useRef({});
  password.current = watch("password", "");

  const onSubmitForm = async (data: FormData) => {
    console.log("SUBMIT ADD USER", data);

    const res = await fetch.post("/api/auth/register", {
      ...data,
      role: Role.STAFF,
    });
    console.log(res);

    if (res.data.code === "EMAIL_TAKEN") {
      clearErrorMsg();
      setError("email", { message: "Email ist bereits vergeben" });
    }
    if (res.status === 200) {
      const createdUser = res.data.user;
      const newUser: User = {
        id: createdUser.id,
        firstName: createdUser.firstName,
        lastName: createdUser.lastName,
        email: createdUser.email,
        role: createdUser.role,
      };

      onSubmit(newUser);
    }
  };

  return (
    <Modal
      show={show}
      onClose={() => {
        if (!isFetching) onClose();
      }}
      position={position}
      dismissible={dismissible}
    >
      <Modal.Header className="uppercase text-gray-800">
        Mitarbeiter hinzufügen
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <form
            className="flex w-full flex-col gap-4"
            onSubmit={handleSubmit(onSubmitForm)}
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
            <div>
              <div className="mb-2 mt-1 block">
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
                  value="Passwort wiederholen"
                  color={errors.passwordRepeat && "failure"}
                />
              </div>
              <TextInput
                id="passwordRepeat"
                type="password"
                placeholder="Passwort wiederholen"
                color={errors.passwordRepeat && "failure"}
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
              color="success"
              type="submit"
              className="mt-5"
              isLoading={isFetching}
            >
              Hinzufügen
            </LoadingButton>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AddStaffModal;
