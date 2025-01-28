import Cookies from "js-cookie";

export const setCookies = (name, value, expires) => {
  Cookies.set(name, value, { expires });
};

export const clearAllCookies = () => {
  const allCookies = Cookies.get();

  for (const cookieName in allCookies) {
    Cookies.remove(cookieName);
  }

  console.log("All cookies have been cleared!");
};
