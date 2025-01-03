import Cookies from "js-cookie";

export function setCookies(name, value, expires) {
  Cookies.set(name, value, { expires });
}
