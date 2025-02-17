import { NextResponse } from "next/server";
import { workflowBackend } from "./app/_utils/api/axiosConfig";

export async function middleware(request) {
  const authToken = request.cookies.get("authToken");

  if (!authToken) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  try {
    const response = await workflowBackend.get("/users/tokenexpired", {
      headers: {
        Authorization: `Bearer ${authToken.value}`,
      },
    });

    if (response.status !== 200) {
      return NextResponse.redirect(new URL("/auth/signin", request.url));
    }
  } catch (error) {
    console.error("Error verifying token:", error);
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  const moduleSelected = request.nextUrl.pathname.split("/")[1];

  const moduleId =
    moduleSelected === "work-management"
      ? process.env.WORK_MANAGEMENT_MODULE_ID
      : moduleSelected === "dev"
      ? process.env.DEV_MODULE_ID
      : moduleSelected === "crm"
      ? process.env.CRM_MODULE_ID
      : moduleSelected === "service"
      ? process.env.SERVICE_MODULE_ID
      : null;

  if (moduleId) {
    const response = NextResponse.next();

    response.cookies.set("moduleId", moduleId);

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:module/view/:view", "/:module/boards/:boardId", "/:module/workspace/:workspaceId"],
};
