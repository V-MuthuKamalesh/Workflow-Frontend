import { NextResponse } from "next/server";
import { workflowBackend } from "./app/_utils/api/axiosConfig";

export async function middleware(request) {
  const publicPaths = ["/auth/signin", "/auth/signup"];

  if (publicPaths.some((path) => request.nextUrl.pathname.startsWith(path))) {
    return NextResponse.next();
  }

  const authToken = request.cookies.get("authToken");

  if (!authToken) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  try {
    const response = await workflowBackend.post("/users/tokenexpired", {
      token: authToken.value,
    });

    if (response.status !== 200) {
      return NextResponse.redirect(new URL("/auth/signin", request.url));
    }
  } catch (error) {
    console.error(error);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/:module/:view",
    "/:module/boards/:boardId",
    "/:module/workspace/:workspaceId",
  ],
};
