import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import ForgotPasswordForm from "./ForgotPasswordForm";
import loadingJuggle from "../images/loadingJuggle.gif";

export default function SignInForm() {
  const { signIn } = useAuth();
  const nav = useNavigate();

  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    try {
      await signIn(formData);

      nav("/create");
    } catch (err) {
      alert(err.message);
      console.error(err);
      setIsLoading(false);
      return;
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          value={formData.userName}
          type="text"
          name="userName"
          placeholder="Enter Name..."
          disabled={isLoading}
        />
        <input
          onChange={handleChange}
          value={formData.password}
          type="text"
          name="password"
          placeholder="Enter Password..."
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? (
            <div>
              <img
                src={loadingJuggle}
                alt="cartoon of loading juggler"
                width={100}
              />
            </div>
          ) : (
            "Sign In"
          )}
        </button>
      </form>
      <p>
        Forgot password?
        <button onClick={() => setForgotPassword(true)}>Get Question</button>
      </p>
      <p>
        Not a User?
        <button
          onClick={() => {
            nav("/signUp");
          }}
        >
          Sign Up
        </button>
      </p>
      {forgotPassword && <ForgotPasswordForm />}
    </>
  );
}
