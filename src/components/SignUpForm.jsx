import { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

export default function SignUpForm() {
  const { signUp } = useAuth();
  const nav = useNavigate();
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    password2: "",
    securityQuestions: [],
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    let msg = "";

    if (!formData.userName.trim()) {
      msg += `Please include UserName \n`;
    }

    if (!formData.password || formData.password !== formData.password2) {
      msg += `Please include a password and make sure they match`;
    }

    if (msg) {
      return alert(msg);
    }

    try {
      await signUp(formData);

      nav("/create");
    } catch (err) {
      alert("Sign Up Failed");
      console.error(err);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          type="text"
          name="username"
          placeholder="UserName..."
        />
        <input
          onChange={handleChange}
          type="password"
          name="password"
          placeholder="Password..."
        />
        <input
          onChange={handleChange}
          type="password"
          name="password2"
          placeholder="Confirm Password..."
        />
        <input type="submit" value="Register" />
      </form>
      <p>
        Already A User?{" "}
        <button
          onClick={() => {
            nav("/signIn");
          }}
        >
          Sign In
        </button>
      </p>
    </>
  );
}
