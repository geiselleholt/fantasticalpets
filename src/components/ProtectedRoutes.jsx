import { Outlet } from "react-router-dom";
import { useAuth } from "../context/authContext";
import SignInPage from "../pages/SignInPage";

export default function ProtectedRoutes() {
  const { cookies } = useAuth();

  return cookies.token ? <Outlet /> : <SignInPage />;
}
