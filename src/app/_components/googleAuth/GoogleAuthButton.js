"use client";

import { useGoogleLogin } from "@react-oauth/google";
import Google from "../svg/Google";
import { fetchUserInfo } from "@/app/_utils/api/googleAuth";

export default function GoogleAuthButton({ text, className, type }) {
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      fetchUserInfo(tokenResponse.token_type, tokenResponse.access_token);
    },
    onError: (error) => console.error("Error: ", error),
  });

  return (
    <button onClick={type === "login" && login} className={className}>
      <Google />
      <span>{text}</span>
    </button>
  );
}
