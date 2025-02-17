"use client";

import { useGoogleLogin } from "@react-oauth/google";
import { workflowBackend } from "@/app/_utils/api/axiosConfig";
import { useRouter } from "next/navigation";
import { setCookies } from "@/app/_utils/helpers/cookies";
import Google from "@/app/(application)/_components/svg/Google";

export default function GoogleAuthButton({ text, className, type }) {
  const router = useRouter();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const response = await workflowBackend.post("/users/oauth", { accessToken: tokenResponse.access_token });

      if (response.status === 200) {
        setCookies("fullName", response.data.userName);
        setCookies("userId", response.data.userId);
        setCookies("authToken", response.data.token, 1);
        router.push("/");
      }
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
