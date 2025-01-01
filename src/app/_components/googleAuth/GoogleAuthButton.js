"use client";

import { useGoogleLogin } from "@react-oauth/google";
import Google from "../svg/Google";

export default function GoogleAuthButton({ text, className, type }) {
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => console.log("Success: ", tokenResponse),
    onError: (error) => console.error("Error: ", error),
  });

  return (
    <button onClick={type === "login" && login} className={className}>
      <Google />
      <span>{text}</span>
    </button>
  );
}
