"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { logoutUser } from "@/lib/auth_handler";
import { useRouter } from "next/navigation";

const ProtectedContent: React.FC = () => {
  const router = useRouter();
  const handleLogout = () => {
    logoutUser();
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="max-w-lg w-full bg-white shadow-md rounded-md p-6">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Protected Page
        </h2>

        <p className="text-center mb-4">
          Welcome to the protected content area!
        </p>

        <Button onClick={handleLogout} className="w-full mt-6">
          Logout
        </Button>
      </div>
    </div>
  );
};

export default ProtectedContent;
