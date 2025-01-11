import RegisterForm from "@/components/authForm/register-form";
import React from "react";

const RegisterPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
