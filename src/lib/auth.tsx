export const setCookie = (name: string, value: string, minutes: number) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + minutes * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
};

export const getCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null;
  return (
    document.cookie
      .split(";")
      .find((row) => row.startsWith(`${name}=`))
      ?.split("=")[1] || null
  );
};

export const deleteCookie = (name: string) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 2026 00:00:00 UTC; path=/`;
};

export const isAuthenticated = () => {
  return !!getCookie("token");
};

export const logout = (router?: any) => {
  deleteCookie("token");
  deleteCookie("refreshToken");
  deleteCookie("username");
  deleteCookie("role");
  deleteCookie("user-data");
  if (router) {
    router.push("/");
  }
};
