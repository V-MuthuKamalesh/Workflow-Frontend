import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "./feautres/boardSlice";
import workspaceReducer from "./feautres/workspaceSlice";
import favoritesReducer from "./feautres/favoritesSlice";
import userDetailsReducer from "./feautres/userDetailsSlice";

const store = configureStore({
  reducer: {
    board: boardReducer,
    workspace: workspaceReducer,
    favorites: favoritesReducer,
    userDetails: userDetailsReducer,
  },
});

export default store;

// import { NextResponse } from "next/server";
// import { workflowBackend } from "./app/_utils/api/axiosConfig";

// export async function middleware(request) {
//   const publicPaths = [
//     "/auth/signin",
//     "/auth/signup",
//     "/auth/forgot-password",
//     "/auth/reset-password",
//     "/users/account-creation",
//   ];

//   if (publicPaths.some((path) => request.nextUrl.pathname.startsWith(path))) {
//     return NextResponse.next();
//   }

//   const moduleMatcher = [
//     "/:module/:view",
//     "/:module/boards/:boardId",
//     "/:module/workspace/:workspaceId",
//   ];

//   const matchesModuleRoute = moduleMatcher.some((matcher) =>
//     request.nextUrl.pathname.match(new RegExp(matcher))
//   );

//   const authToken = request.cookies.get("authToken");

//   if (!authToken) {
//     return NextResponse.redirect(new URL("/auth/signin", request.url));
//   }

//   try {
//     const response = await workflowBackend.post("/users/tokenexpired", {
//       token: authToken.value,
//     });

//     if (response.status !== 200) {
//       return NextResponse.redirect(new URL("/auth/signin", request.url));
//     }
//   } catch (error) {
//     console.error("Error verifying token:", error);
//     return NextResponse.redirect(new URL("/auth/signin", request.url));
//   }

//   const moduleSelected = request.nextUrl.pathname.split("/")[1];

//   const moduleId =
//     moduleSelected === "work-management"
//       ? process.env.WORK_MANAGEMENT_MODULE_ID
//       : moduleSelected === "dev"
//       ? process.env.DEV_MODULE_ID
//       : moduleSelected === "crm"
//       ? process.env.CRM_MODULE_ID
//       : moduleSelected === "service"
//       ? process.env.SERVICE_MODULE_ID
//       : null;

//   if (moduleId) {
//     const response = NextResponse.next();

//     response.cookies.set("moduleId", moduleId);

//     return response;
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     "/auth/signin",
//     "/auth/signup",
//     "/:module/:view",
//     "/:module/boards/:boardId",
//     "/:module/workspace/:workspaceId",
//   ],
// };
