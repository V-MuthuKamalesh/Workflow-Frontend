"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { workflowBackend } from "@/app/_utils/api/axiosConfig";
import { setCookies } from "@/app/_utils/helpers/cookies";
import Input from "@/app/(application)/_components/UI/Input";
import Button from "@/app/(application)/_components/UI/Button";

export default function BasicAuthSignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await workflowBackend.post("/users/login", formData);

      if (response.status === 200) {
        setCookies("fullName", response.data.userName);
        setCookies("userId", response.data.userId);
        setCookies("authToken", response.data.token, 1);
        router.push("/");
      }
    } catch (error) {
      setError(true);
    }
  }

  function handleFormDataChange(event) {
    const { name, value } = event.target;

    setFormData((prevState) => ({ ...prevState, [name]: value }));
    setError(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm flex flex-col items-center mt-8"
    >
      <Input
        title="Your Email Address"
        type="email"
        placeholder="name@company.com"
        name="email"
        value={formData.email}
        onChange={handleFormDataChange}
        autocomplete="off"
        required
      />
      <Input
        title="Your Password"
        type="password"
        placeholder="Password"
        minLength="5"
        name="password"
        value={formData.password}
        onChange={handleFormDataChange}
        required
      />

      {error && (
        <span className="text-red-600 text-xs">Invalid Credentials</span>
      )}

      <Button buttonText="Log In" />
    </form>
  );
}
