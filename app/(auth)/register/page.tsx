import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import RegisterForm from "@/components/Auth/Register/RegisterForm";
import ContentContainer from "@/components/UI/Container/ContentContainer";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const RegisterPage = async () => {
  const session = await getServerSession(authOptions);
  if (session) redirect("/");

  return (
    <ContentContainer
      className="mt-12 mb-5 p-4 pt-10 flex flex-1"
      innerClassName="flex justify-center"
    >
      <RegisterForm />
    </ContentContainer>
  );
};

export default RegisterPage;
