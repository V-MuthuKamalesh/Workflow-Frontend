"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { workflowBackend } from "@/app/_utils/api/axiosConfig";
import Input from "@/app/(application)/_components/UI/Input";
import Button from "@/app/(application)/_components/UI/Button";
import { setCookies } from "@/app/_utils/helpers/cookies";

export default function BasicAuthSignUp() {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  async function handleEmailSubmit(event) {
    event.preventDefault();

    try {
      const response = await workflowBackend.post("/users/email", { email });

      setCookies("signupEmail", email);
      router.push("/users/account-creation");
    } catch (error) {
      if (error.response?.status === 409) {
        setErrorMessage("Email already exists. Please try another one.");
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
    }
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
    setErrorMessage("");
  }

  return (
    <div className="flex flex-col items-center justify-center w-full space-y-4">
      {errorMessage && (
        <div className="w-full p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
          <span className="block font-medium">Error</span>
          <p className="text-sm mt-1">{errorMessage}</p>
        </div>
      )}

      <form onSubmit={handleEmailSubmit} className="w-full flex flex-col items-center space-y-4">
        <Input className="w-full outline-none border border-gray-300 p-2 rounded-sm" type="email" placeholder="name@company.com" name="email" value={email} onChange={handleEmailChange} autoComplete="off" required />
        <Button buttonText="Continue" />
      </form>
    </div>
  );
}
