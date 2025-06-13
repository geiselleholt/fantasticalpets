import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import loadingJuggle from "../images/loadingJuggle.gif";

export default function ForgotPasswordForm({}) {
  const { getQuestions, getAnswers } = useAuth();
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
      console.log(`front: ${answer1}, ${answer2}`);

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
    <>
      <div className="card bg-white bg-opacity-10 p-6 md:p-10 rounded-2xl shadow-2xl backdrop-blur-sm max-w-md w-full mb-8 border border-blue-400">
        <h2
          className="text-3xl md:text-4xl font-bold mb-6 text-center drop-shadow-md
                       bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent"
        >
          Forgot Password?
        </h2>

        {!showQuestions ? (
          <>
            <form
              onSubmit={handleUsernameSubmit}
              className="flex flex-col gap-4"
            >
              <input
                type="text"
                placeholder="Enter Your Username"
                value={username}
                onChange={handleUsernameChange}
                disabled={loading}
                className="input input-bordered input-primary w-full bg-blue-50 text-black"
              />
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
                    />
                  </div>
                ) : (
                  "Submit"
                )}
              </button>
            </form>
            <p className="text-sm text-black mt-6 text-center">
              Not Working?{" "}
              <button
                onClick={() => nav("/signUp")}
                disabled={loading}
                className="btn btn-link text-secondary p-0 min-h-0 h-auto align-baseline"
              >
                Sign Up Again
              </button>
            </p>
          </>
        ) : (
          <>
            <form onSubmit={handleAnswerSubmit} className="flex flex-col gap-4">
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-center text-black">
                You only need to answer ONE question correctly.
              </h3>
              <div className="mb-4">
                <p className="text-lg text-black mb-2">{Question1}</p>{" "}
                <input
                  type="text"
                  placeholder="Enter Your Answer for Question 1"
                  value={answer1}
                  onChange={handleAnswer1Change}
                  disabled={loading}
                  className="input input-bordered input-primary w-full bg-blue-50 text-black"
                />
              </div>
              <p className="text-lg text-black text-center mb-4">Or</p>{" "}
              <div className="mb-4">
                <p className="text-lg text-black mb-2">{Question2}</p>{" "}
                <input
                  type="text"
                  placeholder="Enter Your Answer for Question 2"
                  value={answer2}
                  onChange={handleAnswer2Change}
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
                    />
                  </div>
                ) : (
                  "Submit"
                )}
              </button>
            </form>
            <p className="text-sm text-black mt-6 text-center">
              Not Working?...{" "}
              <button
                onClick={() => nav("/signUp")}
                disabled={loading}
                className="btn btn-link text-secondary p-0 min-h-0 h-auto align-baseline"
              >
                Sign Up Again
              </button>
            </p>
          </>
        )}
      </div>
    </>
  );
}
