import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import ForgotPasswordForm from "./ForgotPasswordForm";

export default function SignInForm() {
  const { signIn } = useAuth();
  const nav = useNavigate();

  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });

  const [forgotPassword, setForgotPassword] = useState(false);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await signIn(formData);

      nav("/collection");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          type="text"
          name="userName"
          placeholder="Name"
        />
        <input
          onChange={handleChange}
          type="password"
          name="password"
          placeholder="Password"
        />
        <input type="submit" value="SignIn" />
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
          Sign Up!
        </button>
      </p>
      {forgotPassword && (
        <ForgotPasswordForm onClose={() => setForgotPassword(false)} />
      )}
    </>
  );
}
