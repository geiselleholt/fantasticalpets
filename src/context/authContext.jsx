import { createContext, useContext, useMemo } from "react";
import { userInfo } from "./userContext";
import { useCookies } from "react-cookie";
import axios from "axios";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const { setUser } = userInfo();
  const [cookies, setCookie, removeCookie] = useCookies();

  const baseURL = `http://localhost:3000/api/user`;

  async function signUp(formData) {
    try {
      const res = await axios.post(`${baseURL}/signUp`, formData);
      setCookie("token", res.data.token);
      return res.data;
    } catch (error) {
      if (error.response?.data?.msg === "Invalid Credentials") {
        throw new Error("Username already in use");
      }
      if (error.response && error.response.data && error.response.data.msg) {
        throw new Error(error.response.data.msg);
      }
      throw new Error("Sign Up Failed, please try again.");
    }
  }

  async function signIn(formData) {
    try {
      const res = await axios.post(`${baseURL}/signIn`, formData);
      setCookie("token", res.data.token);
      return res.data;
    } catch (error) {
      if (error.response?.data?.msg === "Invalid Credentials") {
        throw new Error("Invalid Credentials");
      }
      if (error.response && error.response.data && error.response.data.msg) {
        throw new Error(error.response.data.msg);
      }
      throw new Error("Sign In Failed, please try again.");
    }
  }

  async function getQuestions(username) {
    try {
      const res = await axios.post(`${baseURL}/questions`, {
        userName: username,
      });
      return res.data;
    } catch (error) {
      if (error.response?.data?.msg === "Invalid Credentials") {
        throw new Error("Username not found");
      }
      throw new Error(
        error.response?.data?.msg || "Failed to retrieve security questions."
      );
    }
  }

  async function getAnswers(username, answer1, answer2) {
    try {
      console.log(username, answer1, answer2)
      const res = await axios.post(`${baseURL}/answers`, {
        userName: username,
        answer1: answer1,
        answer2: answer2,
      });
      setCookie("token", res.data.token);
      return res.data;
    } catch (error) {
      console.error(error)
      if (error.response?.data?.msg === "Invalid Credentials") {
        throw new Error("Incorrect answer(s)");
      }
      throw new Error(error.response?.data?.msg || "Failed to verify answers.");
    }
  }

  function signOut() {
    ["token"].forEach((cookie) => {
      removeCookie(cookie);
    });
    setUser(null);
  }

  const value = useMemo(
    () => ({
      cookies,
      signUp,
      signIn,
      signOut,
      getQuestions,
      getAnswers,
    }),
    [cookies]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
