import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { userInfo } from "../context/userContext";

export default function Nav() {
  const { user, setUser } = userInfo();
  const { cookies, signOut } = useAuth();
  const nav = useNavigate();
  const location = useLocation();

  function handleLogout() {
    signOut();

    nav("/");
  }

  return (
    <nav>
      <ul>
        <li>{location.pathname !== "/" && !cookies.token && <Link to="/">Home</Link>}</li>

        {cookies.token ? (
          <>
            <li>
              {location.pathname !== "/collection" && (
                <Link to="/collection">Collection</Link>
              )}
            </li>

            <li>
              {location.pathname !== "/create" && (
                <Link to="/create">Create</Link>
              )}
            </li>

            <li>
              <span onClick={handleLogout}>SignOut</span>
            </li>
          </>
        ) : (
          <ul>
            <li>
              {location.pathname !== "/signIn" && (
                <Link to="/signIn">SignIn</Link>
              )}
            </li>
            <li>
              {location.pathname !== "/signUp" && (
                <Link to="/signUp">SignUp</Link>
              )}
            </li>
          </ul>
        )}
      </ul>
    </nav>
  );
}
