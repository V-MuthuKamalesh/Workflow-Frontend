"use client";

import Button from "@/app/(application)/_components/UI/Button";
import Input from "@/app/(application)/_components/UI/Input";
import { workflowBackend } from "@/app/_utils/api/axiosConfig";
import { CircleCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setMessage(null);

    try {
      const response = await workflowBackend.post("/users/resetemail", { email });
      if (response.status === 200) {
        setMessage("Password reset link has been sent to your email.");
        setTimeout(() => router.push("/auth/signin"), 3000);
      }
    } catch (error) {
      setErrorMessage("Failed to send reset link. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setErrorMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">
      <Input title="Your Email Address" type="email" placeholder="name@company.com" name="email" value={email} onChange={handleEmailChange} autoComplete="off" required />
      {errorMessage && (
        <div className="mt-4 w-full p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
          <span className="block font-medium">Error</span>
          <p className="text-sm mt-1">{errorMessage}</p>
        </div>
      )}

      {message && (
        <div className="mt-4 w-full p-3 flex items-center space-x-1 bg-green-100 border border-green-400 text-green-700 rounded-md">
          <CircleCheck className="h-5 w-5 text-green-600" />
          <p className="text-sm">{message}</p>
        </div>
      )}
      <Button buttonText={loading ? "Sending..." : "Send Reset Link"} className="mt-4" disabled={loading} />
    </form>
  );
}
