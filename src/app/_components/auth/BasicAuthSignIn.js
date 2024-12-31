"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "../UI/Button";
import Input from "../UI/Input";

export default function BasicAuthSignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const router = useRouter();

  function handleSubmit(event) {
    event.preventDefault();

    // TODO: Backend Signin
    const response = { status: 200 };

    setFormData({ email: "", password: "" });

    if (response.status === 409) {
      setError(true);
      return;
    }

    router.push("/dashboard");
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
