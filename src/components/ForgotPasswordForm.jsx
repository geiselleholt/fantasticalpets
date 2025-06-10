// ForgotPasswordForm.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import loadingJuggle from "../images/loadingJuggle.gif";

export default function ForgotPasswordForm({}) {
  const { getQuestions, getAnswers, signIn } = useAuth();
  const nav = useNavigate();

  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const [showQuestions, setShowQuestions] = useState(false);
  const [Question1, setQuestion1] = useState("");
  const [Question2, setQuestion2] = useState("");
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleAnswer1Change = (e) => {
    setAnswer1(e.target.value);
  };

  const handleAnswer2Change = (e) => {
    setAnswer2(e.target.value);
  };

  const handleUsernameSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await getQuestions(username);
      setQuestion1(data.question1);
      setQuestion2(data.question2);
      setShowQuestions(true);
      setAnswer1("");
      setAnswer2("");
    } catch (err) {
      alert(err.message);
      console.error(err);
      return;
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await getAnswers(username, answer1, answer2);
      console.log(`front: ${answer1}, ${answer2}`)

      nav("/create");
    } catch (err) {
      alert(err.message);
      console.error(err);
      return;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Forgot Password?</h2>

      {!showQuestions ? (
        <>
          <form onSubmit={handleUsernameSubmit}>
            <input
              type="text"
              placeholder="Enter Your User Name"
              value={username}
              onChange={handleUsernameChange}
              disabled={loading}
            />
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
                "Submit"
              )}
            </button>
          </form>
          <p>
            Not Working?
            <button onClick={() => nav("/signUp")} disabled={loading}>
              Sign Up Again
            </button>
          </p>
        </>
      ) : (
        <>
          <form onSubmit={handleAnswerSubmit}>
            <h3>You only need to answer ONE question correctly.</h3>
            <div>
              <p>{Question1}</p>
              <input
                type="text"
                placeholder="Enter Your Answer for Question 1"
                value={answer1}
                onChange={handleAnswer1Change}
                disabled={loading}
              />
            </div>
            <p>Or</p>
            <div>
              <p>{Question2}</p>
              <input
                type="text"
                placeholder="Enter Your Answer for Question 2"
                value={answer2}
                onChange={handleAnswer2Change}
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
                "Submit"
              )}
            </button>
          </form>
          <p>
            Not Working?...
            <button onClick={() => nav("/signUp")} disabled={loading}>
              Sign Up Again
            </button>
          </p>
        </>
      )}
    </div>
  );
}
