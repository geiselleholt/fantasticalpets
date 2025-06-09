import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { userInfo } from "../context/userContext";

export default function Nav() {
  const { user, setUser } = userInfo();
  const { cookies, signOut } = useAuth();
  const nav = useNavigate();

  useEffect(() => {
    async function checkUser() {
      if (cookies.token && !user) {
        try {
          let res = await axios.get(`http://localhost:3000/api/user`, {
            headers: { token: cookies.token },
          });

          const { userName } = res.data;

          setUser({ userName });
        } catch (err) {
          console.error(err.message);
        }
      }
    }

    checkUser();
  }, []);

  function handleLogout() {
    signOut();

    nav("/");
  }
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>

        {cookies.token ? (
          <>
            <li>
              <Link to="/collection">Collection</Link>
            </li>

            {user ? (
              <li>
                <Link to="/create">Create</Link>
              </li>
            ) : null}

            <li>
              <button onClick={handleLogout}>SignOut</button>
            </li>
          </>
        ) : (
          <li>
            <Link to="/signIn">SignIn</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
