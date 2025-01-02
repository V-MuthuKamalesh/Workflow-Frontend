"use client";

import { useGoogleLogin } from "@react-oauth/google";
import Google from "../svg/Google";
import { fetchUserInfo } from "@/app/_utils/api/googleAuth";
import { workflowBackend } from "@/app/_utils/api/axiosConfig";
import { useRouter } from "next/navigation";

export default function GoogleAuthButton({ text, className, type }) {
  const router = useRouter();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const userInfoFromGoogle = await fetchUserInfo(
        tokenResponse.token_type,
        tokenResponse.access_token
      );

      const response = await workflowBackend.post(
        "/users/oauth",
        userInfoFromGoogle
      );

      const userLoginInfo = {
        username: response.data.userName,
        token: response.data.token,
      };

      if (response.status === 200) {
        localStorage.setItem("userLoginInfo", JSON.stringify(userLoginInfo));
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
