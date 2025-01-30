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
  const [errorMessage, setErrorMessage] = useState("");
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
      if (error.response?.status === 401) {
        setErrorMessage("Invalid email or password.");
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
    }
  }

  function handleFormDataChange(event) {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
    setErrorMessage("");
  }

  return (
    <div className="w-full max-w-sm flex flex-col items-center mt-8">
      {errorMessage && (
        <div className="w-full p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
          <span className="block font-medium">Error</span>
          <p className="text-sm mt-1">{errorMessage}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="w-full flex flex-col items-center space-y-4">
        <Input title="Your Email Address" type="email" placeholder="name@company.com" name="email" value={formData.email} onChange={handleFormDataChange} autoComplete="off" required />
        <Input title="Your Password" type="password" placeholder="Password" minLength="5" name="password" value={formData.password} onChange={handleFormDataChange} required />
        <Button buttonText="Log In" />
      </form>
    </div>
  );
}
