import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignInForm() {
  const nav = useNavigate();

  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    securityQuestions: [],
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await login(formData);

      nav("/dashboard");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="loginForm">
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
    </form>
  );
}
