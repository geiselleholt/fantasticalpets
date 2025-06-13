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
      console.error("Sign In Error:", err);
      setIsLoading(false);
      return;
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-300 via-sky-500 to-blue-800 text-white font-inter">
      <h1
        className="text-5xl md:text-6xl font-extrabold mb-8 leading-tight text-center
                     bg-gradient-to-r from-green-600 via-blue-400 via-green-600 to-pink-600 bg-clip-text text-transparent
                     drop-shadow-[0_0_3px_rgb(0,0,0)] md:drop-shadow-[0_0_4px_rgb(0,0,0)]"
      >
        Sign In to Your Fantastical World!
      </h1>

      <div className="card bg-white bg-opacity-10 p-6 md:p-10 rounded-2xl shadow-2xl backdrop-blur-sm max-w-md w-full mb-8 border border-blue-400">
        <h2
          className="text-3xl md:text-4xl font-bold mb-6 text-center drop-shadow-md
                       bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent"
        >
          Welcome Back!
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            onChange={handleChange}
            value={formData.userName}
            type="text"
            name="userName"
            placeholder="Enter Username"
            disabled={isLoading}
            className="input input-bordered input-primary w-full bg-blue-50 text-black"
          />
          <input
            onChange={handleChange}
            value={formData.password}
            type="text"
            name="password"
            placeholder="Enter Password"
            disabled={isLoading}
            className="input input-bordered input-primary w-full bg-blue-50 text-black"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary w-full text-lg py-3 rounded-full shadow-lg transform transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary active:bg-primary-focus"
          >
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

        <p className="text-sm text-black mt-6 text-center">
          Forgot password?{" "}
          <button
            onClick={() => setForgotPassword(true)}
            disabled={isLoading}
            className="btn btn-link text-primary p-0 min-h-0 h-auto align-baseline"
          >
            Answer a Question to Sign In
          </button>
        </p>
        <p className="text-sm text-black text-center">
          Not a User?{" "}
          <button
            onClick={() => {
              nav("/signUp");
            }}
            disabled={isLoading}
            className="btn btn-link text-secondary p-0 min-h-0 h-auto align-baseline"
          >
            Sign Up
          </button>
        </p>
      </div>

      {forgotPassword && <ForgotPasswordForm />}
    </div>
  );
}
