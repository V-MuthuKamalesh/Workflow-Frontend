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

      setCookies("email", email);
      router.push("/users/account-creation");
    } catch (error) {
      console.log(error);
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
    <form
      onSubmit={handleEmailSubmit}
      className="flex flex-col items-center justify-center space-y-4 w-full"
    >
      <Input
        className="w-full outline-none border border-gray-300 p-2 rounded-sm"
        type="email"
        placeholder="name@company.com"
        name="email"
        value={email}
        onChange={handleEmailChange}
        autoComplete="off"
        required
      />
      {errorMessage !== "" && (
        <span className="text-red-600 text-xs">{errorMessage}</span>
      )}
      <Button buttonText="Continue" />
    </form>
  );
}
