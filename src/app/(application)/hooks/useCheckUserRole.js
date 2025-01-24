"use client";

import { workflowBackend } from "@/app/_utils/api/axiosConfig";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function useCheckUserRole(userId, workspaceId) {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkUserRole = async () => {
      if (userId && workspaceId) {
        try {
          const response = await workflowBackend.post(
            "/users/checkRole",
            {
              workspaceId,
              userId,
            },
            {
              headers: {
                Authorization: `Bearer ${Cookies.get("authToken")}`,
              },
            }
          );

          setIsAdmin(response.data.role === "admin");
        } catch (error) {
          console.error("Error checking user role:", error);
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
    };

    checkUserRole();
  }, [userId, workspaceId]);

  return { isAdmin };
}
