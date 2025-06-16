import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

export default function NavBar() {
  const { cookies, signOut } = useAuth();
  const nav = useNavigate();
  const location = useLocation();

  function handleSignOut() {
    signOut();
    nav("/");
  }

  return (
    <nav className="bg-gradient-to-r from-purple-400 via-sky-500 to-purple-600 p-4 shadow-lg fixed top-0 w-full z-50">
      <ul className="flex justify-end items-center gap-6">
        {cookies.token ? (
          <>
            <li>
              {location.pathname !== "/collection" && (
                <Link
                  to="/collection"
                  className="text-white text-lg font-bold px-4 py-2 rounded-md cursor-pointer hover:bg-white hover:bg-opacity-20 transition-colors"
                >
                  Collection
                </Link>
              )}
            </li>

            <li>
              {location.pathname !== "/create" && (
                <Link
                  to="/create"
                  className="text-white text-lg font-bold px-4 py-2 rounded-md cursor-pointer hover:bg-white hover:bg-opacity-20 transition-colors"
                >
                  Create
                </Link>
              )}
            </li>

            <li>
              {location.pathname !== "/guess" && (
                <Link
                  to="/guess"
                  className="text-white text-lg font-bold px-4 py-2 rounded-md cursor-pointer hover:bg-white hover:bg-opacity-20 transition-colors"
                >
                  Guessing Game
                </Link>
              )}
            </li>

            <li>
              <span
                onClick={handleSignOut}
                className="text-white text-lg font-bold px-4 py-2 rounded-md cursor-pointer hover:bg-white hover:bg-opacity-20 transition-colors"
              >
                Sign Out
              </span>
            </li>
          </>
        ) : (
          <ul className="flex gap-6">
            <li>
              {location.pathname !== "/signIn" && (
                <Link
                  to="/signIn"
                  className="text-white text-lg font-bold px-4 py-2 rounded-md cursor-pointer hover:bg-white hover:bg-opacity-20 transition-colors"
                >
                  Sign In
                </Link>
              )}
            </li>
            <li>
              {location.pathname !== "/signUp" && (
                <Link
                  to="/signUp"
                  className="text-white text-lg font-bold px-4 py-2 rounded-md cursor-pointer hover:bg-white hover:bg-opacity-20 transition-colors"
                >
                  Sign Up
                </Link>
              )}
            </li>
          </ul>
        )}
      </ul>
    </nav>
  );
}
