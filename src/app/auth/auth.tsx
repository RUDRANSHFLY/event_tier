"use client"

import React from "react";
import { SignIn } from "@clerk/clerk-react";

const AuthScreen = () => {
  return (
    <div className="w-screen h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md flex flex-col items-center">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-2">
          Welcome Back ✌️
        </h1>
        <h2 className="text-lg font-medium text-gray-600 text-center mb-6">
          Sign in to continue to your account
        </h2>

        <SignIn
          path="/sign-in"
          routing="path"
          appearance={{
            elements: {
              card: "shadow-none px-0",
              formButtonPrimary:
                "bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg",
              headerTitle: "text-lg font-semibold text-gray-700",
              footerActionText: "text-sm text-gray-500",
              footerActionLink: "text-blue-600 hover:underline",
            },
            variables: {
              colorPrimary: "#2563eb", // Tailwind blue-600
            },
          }}
        />
      </div>
    </div>
  );
};

export default AuthScreen;
