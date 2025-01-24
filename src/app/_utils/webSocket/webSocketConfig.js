import Cookies from "js-cookie";
import { io } from "socket.io-client";

export const socket = io(process.env.NEXT_PUBLIC_WEB_SOCKET_URL, {
  transports: ["websocket"],
  auth: {
    token: Cookies.get("authToken"),
  },
});
