import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import axios from "axios";
import DisplayCategory from "../components/DisplayCategory";
import categoriesData from "../data/categoriesData";

const GAME_DURATION_SECONDS = 120; // 2 minutes
const FEEDBACK_DISPLAY_DURATION = 1500; // 1.5 seconds

export default function GuessingGamePage() {
  const nav = useNavigate();
  const { cookies } = useAuth();
  const API_BASE_URL = "https://fantasicalpetsbackend.onrender.com/api";

  const [randomPet, setRandomPet] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedGuesses, setSelectedGuesses] = useState([]);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [showResult, setShowResult] = useState(false);

  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    const savedHighScore = localStorage.getItem("hybridGuessingHighScore");
    return savedHighScore ? parseInt(savedHighScore, 10) : 0;
  });
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION_SECONDS);
  const [isGameActive, setIsGameActive] = useState(false);
  const timerRef = useRef(null);

  const [countdownActive, setCountdownActive] = useState(false);
  const [countdownValue, setCountdownValue] = useState(5);
  const countdownTimerRef = useRef(null);

  const selectionsRef = useRef(null);

  const fetchRandomPet = useCallback(async () => {
    setIsLoading(true);
    setFeedbackMessage("");
    setSelectedGuesses([]);
    setRandomPet(null);

    try {
      const headers = cookies.token ? { "x-auth-token": cookies.token } : {};
      const response = await axios.get(`${API_BASE_URL}/image/random`, {
        headers,
      });
      setRandomPet(response.data);
    } catch (err) {
      console.error("Error fetching random pet:", err);
      let msg = "Error loading game. Please try again later.";
      if (err.response && err.response.status === 404) {
        msg = "No hybrid pets found to guess! Create some first.";
      }
      setFeedbackMessage(msg);
      // Only set showResult to true if not already active game (mid-game error)
      if (!isGameActive) setShowResult(true);
      setIsGameActive(false); // Stop game if error
    } finally {
      setIsLoading(false);
    }
  }, [API_BASE_URL, cookies.token, isGameActive]);

  // --- Effect for Main Game Timer Countdown ---
  useEffect(() => {
    if (isGameActive && timeLeft > 0) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && isGameActive) {
      clearInterval(timerRef.current);
      timerRef.current = null;
      setIsGameActive(false);
      setShowResult(true);
      setFeedbackMessage(`Time's up! Your final score is ${score}.`);
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem("hybridGuessingHighScore", score.toString());
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isGameActive, timeLeft, score, highScore]);

  // --- Effect for Pre-Game Countdown ---
  useEffect(() => {
    if (countdownActive && countdownValue > 0) {
      if (countdownTimerRef.current) {
        clearInterval(countdownTimerRef.current);
      }
      countdownTimerRef.current = setInterval(() => {
        setCountdownValue((prev) => prev - 1);
      }, 1000);
    } else if (countdownValue === 0 && countdownActive) {
      clearInterval(countdownTimerRef.current);
      countdownTimerRef.current = null;
      setCountdownActive(false);
      setIsGameActive(true);
      fetchRandomPet();
    }

    return () => {
      if (countdownTimerRef.current) {
        clearInterval(countdownTimerRef.current);
      }
    };
  }, [countdownActive, countdownValue, fetchRandomPet]);

  // --- Initial Pet Load on Component Mount ---
  useEffect(() => {
    if (
      !randomPet &&
      !isLoading &&
      !isGameActive &&
      !countdownActive &&
      !showResult
    ) {
      fetchRandomPet();
    }
  }, [
    fetchRandomPet,
    randomPet,
    isLoading,
    isGameActive,
    countdownActive,
    showResult,
  ]);

  // --- Start Game Function ---
  const startGame = () => {
    setScore(0);
    setTimeLeft(GAME_DURATION_SECONDS);
    setFeedbackMessage("");
    setShowResult(false);
    setIsGameActive(false);
    setCountdownActive(true);
    setCountdownValue(5);
  };

  const handleGuessSelect = (animal) => {
    if (showResult || !isGameActive) return;

    setSelectedGuesses((prevSelected) => {
      const isAlreadySelected = prevSelected.some(
        (img) => img.id === animal.id
      );
      let newSelection;
      if (isAlreadySelected) {
        newSelection = prevSelected.filter((img) => img.id !== animal.id);
      } else {
        if (prevSelected.length < 2) {
          newSelection = [...prevSelected, animal];
        } else {
          newSelection = [...prevSelected.slice(1), animal];
        }
      }
      if (newSelection.length > 0 && selectionsRef.current) {
        selectionsRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
      return newSelection;
    });
  };

  const handleSubmitGuess = async () => {
    if (selectedGuesses.length !== 2) {
      setFeedbackMessage("Please select exactly two animals for your guess!");
      return;
    }
    if (!randomPet || !isGameActive || isLoading) {
      setFeedbackMessage("Game not active, no pet to guess, or still loading.");
      return;
    }

    const correctAnimals = [
      randomPet.animal1.toLowerCase(),
      randomPet.animal2.toLowerCase(),
    ].sort();
    const guessedAnimals = selectedGuesses
      .map((g) => g.alt.toLowerCase())
      .sort();
    const isCorrect =
      correctAnimals[0] === guessedAnimals[0] &&
      correctAnimals[1] === guessedAnimals[1];

    if (isCorrect) {
      setFeedbackMessage("🎉 Correct!");
      setScore((prevScore) => prevScore + 1);
    } else {
      setFeedbackMessage(
        `❌ Incorrect. It was a ${randomPet.animal1} + ${randomPet.animal2}.`
      );
    }

    if (timeLeft > 0) {
      setTimeout(() => {
        fetchRandomPet();
      }, FEEDBACK_DISPLAY_DURATION);
    }
  };

  const handlePlayAgain = () => {
    setRandomPet(null);
    setFeedbackMessage("");
    startGame();
  };

  const handleGoToCollection = () => {
    nav("/collection");
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 min-h-[calc(100vh-80px)]">
      <h1 className="text-5xl md:text-6xl font-extrabold mb-8 leading-tight text-center bg-gradient-to-r from-green-600 via-blue-400 via-green-600 to-pink-500 bg-clip-text text-transparent drop-shadow-[0_0_3px_rgb(0,0,0)] md:drop-shadow-[0_0_4px_rgb(0,0,0)] animate-gradient-text">
        Guess the Hybrid!
      </h1>
      <div className="flex flex-col items-center w-full max-w-screen-2xl gap-2">
        <div className="flex justify-between items-center w-full max-w-4xl p-4 rounded-xl bg-white bg-opacity-10 shadow-lg border border-purple-400 text-blue-400 font-bold text-xl md:text-2xl">
          <span>Score: {score}</span>
          <span>High Score: {highScore}</span>
          <span
            className={`${
              isGameActive && timeLeft <= 10 && timeLeft % 2 === 0
                ? "text-red-500 animate-pulse"
                : ""
            }`}
          >
            Time: {formatTime(timeLeft)}
          </span>
        </div>
        {!isGameActive && !countdownActive && !showResult && (
          <div className="flex flex-col items-center text-center card bg-white bg-opacity-10 p-6 md:p-10 rounded-2xl shadow-2xl backdrop-blur-sm max-w-xl w-full border border-blue-400">
            <button
              onClick={startGame}
              className="btn btn-secondary px-8 py-4 text-xl rounded-full shadow-lg transform transition-transform duration-200 hover:scale-105"
            >
              Start Game!
            </button>
          </div>
        )}
        {!showResult ? (
          <>
            {countdownActive ||
            isGameActive ||
            (isLoading && randomPet === null && !countdownActive) ? (
              <div className="card bg-white bg-opacity-10 p-6 md:p-10 rounded-2xl shadow-2xl backdrop-blur-sm w-full max-w-2xl border border-blue-400 flex flex-col items-center justify-center min-h-[300px]">
                {countdownActive ? (
                  <div
                    className="text-white text-9xl font-extrabold animate-bounce"
                    style={{ textShadow: "0 0 10px rgba(0,0,255,0.7)" }}
                  >
                    {countdownValue > 0 ? countdownValue : "GO!"}
                  </div>
                ) : randomPet && isGameActive ? (
                  <>
                    <img
                      src={randomPet.imageUrl}
                      alt="Mystery Hybrid Pet"
                      className="w-full max-w-[200px] md:max-w-[250px] h-auto object-cover rounded-xl border-4 border-yellow-300 shadow-xl"
                    />
                  </>
                ) : null}
              </div>
            ) : null}

            {/* --- 2. Feedback Message Section --- */}
            {feedbackMessage && (
              <div className="w-full max-w-2xl text-center">
                <p
                  className={`text-xl font-bold p-3 rounded-lg ${
                    feedbackMessage.includes("Correct")
                      ? "bg-green-700 text-white"
                      : feedbackMessage.includes("Incorrect") ||
                        feedbackMessage.includes("Time's up")
                      ? "bg-red-700 text-white"
                      : "text-yellow-300"
                  }`}
                >
                  {feedbackMessage}
                </p>
              </div>
            )}

            {/* --- 3. User's Current Guesses Display Section --- */}
            {/* Conditional rendering: Now also hidden during countdown and initial state */}
            {!countdownActive && isGameActive ? (
              <div
                ref={selectionsRef}
                className="card bg-white bg-opacity-10 p-2 md:p-4 rounded-2xl shadow-2xl backdrop-blur-sm max-w-xl w-full border border-pink-400 flex flex-col items-center"
              >
                <div className="flex flex-wrap justify-center gap-20 min-h-[100px] items-center mb-4">
                  {selectedGuesses.length === 0 && (
                    <h3 className="text-xl md:text-2xl font-bold mb-4 text-center bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent animate-pulse-subtle">
                      Select 2 animals below to make your guess!
                    </h3>
                  )}
                  {selectedGuesses.map((img) => (
                    <div
                      key={img.id}
                      className="card compact bg-yellow-100 rounded-xl shadow-lg border border-blue-300 p-4 flex flex-col items-center w-30 h-50 md:w-40 md:h-50 overflow-hidden mb-0"
                    >
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="w-full h-32 object-cover rounded-md"
                      />
                      <span className="text-black text-sm font-semibold text-center mt-auto">
                        {img.alt}
                      </span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={handleSubmitGuess}
                  disabled={
                    selectedGuesses.length !== 2 ||
                    isLoading ||
                    !isGameActive ||
                    countdownActive
                  } // Button disabled during countdown
                  className={`btn btn-primary px-8 py-3 rounded-full shadow-lg transform transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary active:bg-primary-focus ${
                    selectedGuesses.length !== 2 ||
                    isLoading ||
                    !isGameActive ||
                    countdownActive
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  } mb-8`}
                >
                  Submit Guess
                </button>
              </div>
            ) : null}
            <div className="categories grid grid-cols-1 sm:grid-cols-2 sm:grid-cols-2 gap-2 w-full max-w-screen-2xl">
              {categoriesData.map((category) => (
                <DisplayCategory
                  key={category.name}
                  category={category}
                  selectedImages={selectedGuesses}
                  onImageSelectAndScroll={handleGuessSelect}
                />
              ))}
            </div>
            {/* </div> */}
          </>
        ) : null}{" "}
        {/* End of !showResult conditional rendering for game mechanics */}
      </div>
      {/* End of main game content flex container */}
      {/* --- Game Over / Play Again / Go to Collection Options Section --- */}
      {showResult && (
        <div className="card bg-white bg-opacity-10 p-6 md:p-10 rounded-2xl shadow-2xl backdrop-blur-sm w-full max-w-2xl border border-yellow-400 flex flex-col items-center text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            {feedbackMessage.includes("Time's up")
              ? feedbackMessage
              : "Game Over!"}
          </h3>
          <p className="text-2xl text-white mb-2">Final Score: {score}</p>
          <p className="text-2xl text-white mb-6">High Score: {highScore}</p>
          <div className="flex flex-col md:flex-row justify-center gap-4 w-full">
            <button
              onClick={handlePlayAgain}
              className="btn bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full text-lg font-bold shadow-lg transition-transform duration-200 hover:scale-105"
            >
              Play Again!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
