import { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import loadingJuggle from "../images/loadingJuggle.gif";

export default function SignUpForm() {
  const { signUp } = useAuth();
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);

  const securityQuestions = [
    "What is your favorite color?",
    "What is your favorite game?",
    "What was your mom's name?",
    "What was your dad's name?",
    "What was your brother's name?",
    "What was your sister's name?",
    "What was your best friend's name?",
    "What was your pet's name?",
    "What is your favorite food?",
    "What was the name of your school?",
  ];

  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    securityQuestion1: { question: "", answer: "" },
    securityQuestion2: { question: "", answer: "" },
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSecurityQuestion(fieldName, subField, value) {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: {
        ...prevFormData[fieldName],
        [subField]: value,
      },
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      await signUp(formData);
      nav("/create");
    } catch (err) {
      alert(err.message);
      console.error(err);
      return;
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className=" flex flex-col items-center justify-center p-4  ">
      <h1
        className="text-5xl md:text-6xl font-extrabold mb-8 leading-tight text-center
                     bg-gradient-to-r from-green-600 via-blue-400 via-green-600 to-blue-500 bg-clip-text text-transparent
                     drop-shadow-[0_0_3px_rgb(0,0,0)] md:drop-shadow-[0_0_4px_rgb(0,0,0)] animate-gradient-text"
      >
        Join Our Fantastical World!
      </h1>

      <div className="card bg-white bg-opacity-10 p-6 md:p-10 rounded-2xl shadow-2xl backdrop-blur-sm max-w-md w-full mb-8 border border-blue-400">
        <h2
          className="text-3xl md:text-4xl font-bold mb-6 text-center drop-shadow-md
                       bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent"
        >
          Sign Up
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            onChange={handleChange}
            value={formData.userName}
            type="text"
            name="userName"
            placeholder="Enter Username"
            disabled={loading}
            className="input input-bordered input-primary w-full bg-blue-50 text-black"
          />
          <input
            onChange={handleChange}
            value={formData.password}
            type="text"
            name="password"
            placeholder="Enter Password"
            disabled={loading}
            className="input input-bordered input-primary w-full bg-blue-50 text-black"
          />

          <div className="flex flex-col gap-2">
            <select
              onChange={(e) =>
                handleSecurityQuestion(
                  "securityQuestion1",
                  "question",
                  e.target.value
                )
              }
              value={formData.securityQuestion1.question}
              disabled={loading}
              className="select select-bordered select-primary w-full bg-blue-50 text-black"
            >
              <option value="">Select 1st Question</option>
              {securityQuestions.map((q) => (
                <option key={q} value={q}>
                  {q}
                </option>
              ))}
            </select>
            <input
              onChange={(e) =>
                handleSecurityQuestion(
                  "securityQuestion1",
                  "answer",
                  e.target.value
                )
              }
              value={formData.securityQuestion1.answer}
              type="text"
              placeholder="Answer for 1st Question"
              aria-label="Answer for Question 1"
              disabled={loading}
              className="input input-bordered input-primary w-full bg-blue-50 text-black"
            />
          </div>

          <div className="flex flex-col gap-2">
            <select
              onChange={(e) =>
                handleSecurityQuestion(
                  "securityQuestion2",
                  "question",
                  e.target.value
                )
              }
              value={formData.securityQuestion2.question}
              aria-label="Security Question 2"
              disabled={loading}
              className="select select-bordered select-primary w-full bg-blue-50 text-black"
            >
              <option value="">Select 2nd Question</option>
              {securityQuestions.map((q) => (
                <option
                  key={q}
                  value={q}
                  disabled={q === formData.securityQuestion1.question}
                >
                  {q}
                </option>
              ))}
            </select>
            <input
              onChange={(e) =>
                handleSecurityQuestion(
                  "securityQuestion2",
                  "answer",
                  e.target.value
                )
              }
              value={formData.securityQuestion2.answer}
              type="text"
              placeholder="Answer for 2nd Question"
              aria-label="Answer for Question 2"
              disabled={loading}
              className="input input-bordered input-primary w-full bg-blue-50 text-black"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full text-lg py-3 rounded-full shadow-lg transform transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary active:bg-primary-focus"
          >
            {loading ? (
              <div>
                <img
                  src={loadingJuggle}
                  alt="cartoon of loading juggler"
                  width={100}
                  className="mx-auto"
                />
              </div>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <p className="text-sm text-black mt-6 text-center">
          Already a User?{" "}
          <button
            onClick={() => {
              nav("/signIn");
            }}
            className="btn btn-link text-secondary p-0 min-h-0 h-auto align-baseline"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
}
