"use client";

import { Address } from "@/types/customer";
import { Button, Label, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface Props {
  onSubmit: (data: Address) => void;
}

const AddressForm = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<Address>();

  const [savedAddress, setSavedAddress] = useState<Address>();

  return (
    <form
      className="flex max-w-md flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex gap-3">
        <div className="flex-1">
          <div className="mb-2 block">
            <Label
              htmlFor="street"
              value="Straße"
              color={errors.street && "failure"}
            />
          </div>
          <TextInput
            id="street"
            type="text"
            defaultValue={savedAddress?.street}
            placeholder="Straße"
            color={errors.street && "error"}
            {...register("street", { required: "Straße wird benötigt" })}
          />
          {errors.street && (
            <p className="text-red-700 font-light text-sm">
              {errors.street.message}
            </p>
          )}
        </div>
        <div className="w-[30%]">
          <div className="mb-2 block">
            <Label htmlFor="nr" value="Nr." color={errors.nr && "failure"} />
          </div>
          <TextInput
            id="nr"
            placeholder="Nr."
            defaultValue={savedAddress?.nr}
            type="text"
            color={errors.nr && "error"}
            {...register("nr", { required: "Nr. wird benötigt" })}
          />
          {errors.nr && (
            <p className="text-red-700 font-light text-sm">
              {errors.nr.message}
            </p>
          )}
        </div>
      </div>
      <div className="flex gap-3">
        <div className="w-[40%]">
          <div className="mb-2 block">
            <Label htmlFor="zip" value="PLZ" color={errors.zip && "failure"} />
          </div>
          <TextInput
            id="zip"
            type="text"
            placeholder="PLZ"
            defaultValue={savedAddress?.zip}
            color={errors.zip && "error"}
            {...register("zip", { required: "PLZ wird benötigt" })}
          />
          {errors.zip && (
            <p className="text-red-700 font-light text-sm">
              {errors.zip.message}
            </p>
          )}
        </div>
        <div className="flex-1">
          <div className="mb-2 block">
            <Label htmlFor="city" value="Stadt" />
          </div>
          <TextInput
            id="city"
            type="text"
            placeholder="Stadt"
            defaultValue={savedAddress?.city}
            color={errors.city && "error"}
            {...register("city", { required: "Stadt wird benötigt" })}
          />
          {errors.city && (
            <p className="text-red-700 font-light text-sm">
              {errors.city.message}
            </p>
          )}
        </div>
      </div>
      <Button type="submit" color="success" className="w-full mt-2">
        Weiter
      </Button>
    </form>
  );
};

export default AddressForm;
