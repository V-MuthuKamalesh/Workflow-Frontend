"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { workflowBackend } from "@/app/_utils/api/axiosConfig";
import Input from "@/app/(application)/_components/UI/Input";
import Button from "@/app/(application)/_components/UI/Button";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(null);
  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await workflowBackend.post("/users/resetemail", {
        email,
      });

      if (response.status === 200) {
        setMessage("Password reset link has been sent to your email.");
        setTimeout(() => router.push("/auth/login"), 5000);
      }
    } catch (error) {
      setError(true);
    }
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
    setError(false);
  }

  return (
    <section className="w-full max-w-sm mx-auto mt-80">
      <h2 className="text-3xl font-light text-center mb-4">
        Forgot Your Password?
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <Input
          title="Your Email Address"
          type="email"
          placeholder="name@company.com"
          name="email"
          value={email}
          onChange={handleEmailChange}
          autocomplete="off"
          required
        />
        {error && (
          <span className="text-red-600 text-xs mt-2">
            Failed to send reset link. Please try again.
          </span>
        )}
        {message && (
          <span className="text-green-600 text-xs mt-2">{message}</span>
        )}
        <Button buttonText="Send Reset Link" />
      </form>
    </section>
  );
}
