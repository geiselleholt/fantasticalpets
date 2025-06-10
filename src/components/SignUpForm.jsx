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
    <>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          value={formData.userName}
          type="text"
          name="userName"
          placeholder="Enter Name..."
          disabled={loading}
        />
        <input
          onChange={handleChange}
          value={formData.password}
          type="password"
          name="password"
          placeholder=" Enter Password..."
          disabled={loading}
        />

        <div>
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
          />
        </div>

        <div>
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
            className="input-field"
            aria-label="Answer for Question 2"
            disabled={loading}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? (
            <div>
              <img
                src={loadingJuggle}
                alt="cartoon of loading juggler"
                width={100}
              />
            </div>
          ) : (
            "Sign Up"
          )}
        </button>
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
