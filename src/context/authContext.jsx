import { createContext, useContext, useMemo } from "react";
import { userInfo } from "./userContext";
import { useCookies } from "react-cookie";
import axios from "axios";

const AuthContext = createContext(); //Created our context with No value

// Created functional component to PROVIDE context
export default function AuthProvider({ children }) {
  const { setUser, setPets } = userInfo();
  const [cookies, setCookie, removeCookie] = useCookies();

  const baseURL = `http://localhost:3000/api/user`;

  async function signUp(formData) {
    const res = await axios.post(`${baseURL}/signUp`, formData);

    setCookie("token", res.data.token);
  }

  async function signIn(formData) {
    const res = await axios.post(`${baseURL}/signIn`, formData);

    setCookie("token", res.data.token);
  }

  function signOut() {
    ["token"].forEach((cookie) => {
      removeCookie(cookie);
    });

    setPets(null);
    setUser(null);
  }

  const value = useMemo(
    () => ({
      cookies,
      signUp,
      signIn,
      signOut,
    }),
    [cookies]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
