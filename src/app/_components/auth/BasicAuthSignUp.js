"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "../UI/Button";
import Input from "../UI/Input";

export default function BasicAuthSignUp() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  async function handleEmailSubmit(event) {
    event.preventDefault();

    // TODO: Backend Email Verification

    const response = { status: 200 }; // Response from server

    // Email already exists in the database
    if (response.status === 409) {
      setError(true);
      return;
    }

    // If email not exists in the database
    localStorage.setItem("email", email);
    router.push("/users/account-creation");
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
    setError(false);
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
        // autoComplete="off"
        required
      />
      {error && (
        <span className="text-red-600 text-xs">Email Already Exists!</span>
      )}
      <Button buttonText="Continue" />
    </form>
  );
}
