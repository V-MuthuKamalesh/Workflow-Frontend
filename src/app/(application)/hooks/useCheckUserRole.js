"use client";

import { useEffect, useState, useCallback } from "react";
import { workflowBackend } from "@/app/_utils/api/axiosConfig";
import Cookies from "js-cookie";

export default function useCheckUserRole(userId, workspaceId) {
  const [isAdmin, setIsAdmin] = useState(false);

  const checkUserRole = useCallback(async () => {
    if (!userId || !workspaceId) return setIsAdmin(false);

    try {
      const { data } = await workflowBackend.post("/users/checkRole", { workspaceId, userId }, { headers: { Authorization: `Bearer ${Cookies.get("authToken")}` } });

      setIsAdmin(data.role === "admin");
    } catch (error) {
      console.error("Error checking user role:", error);
      setIsAdmin(false);
    }
  }, [userId, workspaceId]);

  useEffect(() => {
    checkUserRole();
  }, [checkUserRole]);

  return { isAdmin };
}
