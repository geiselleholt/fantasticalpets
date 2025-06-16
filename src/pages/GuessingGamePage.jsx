import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import loadingJuggle from "../images/loadingJuggle.gif";
import DisplayCategory from "../components/DisplayCategory";
import categoriesData from "../data/categoriesData";

export default function GuessingGamePage() {
  const nav = useNavigate();
  const selectionsRef = useRef(null);
  const API_BASE_URL = "http://localhost:3000/api";

  const [randomPet, setRandomPet] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedGuesses, setSelectedGuesses] = useState([]);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [showResult, setShowResult] = useState(false);

  const fetchRandomPet = async () => {
    setIsLoading(true);
    setRandomPet(null);
    setSelectedGuesses([]);
    setFeedbackMessage("");
    setShowResult(false);
    try {
      const response = await axios.get(`${API_BASE_URL}/image/random`);
      setRandomPet(response.data);
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomPet();
  }, []);

  const handleGuessSelect = (animal) => {
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

  const handleSubmitGuess = () => {
    if (selectedGuesses.length !== 2) {
      setFeedbackMessage("Please select exactly two animals for your guess!");
      return;
    }

    if (!randomPet) {
      setFeedbackMessage("Error: No pet to guess against.");
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
      setFeedbackMessage("🎉 Correct! You're a true hybrid expert! 🎉");
    } else {
      setFeedbackMessage(
        `❌ Incorrect. This was a ${randomPet.animal1} and ${randomPet.animal2} hybrid.`
      );
    }
    setShowResult(true); // Show the result message and play again/collection buttons
  };

  // --- Navigation Buttons ---
  const handlePlayAgain = () => {
    fetchRandomPet(); // Reset game
  };

  const handleGoToCollection = () => {
    nav("/collection");
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-4 min-h-[calc(100vh-80px)]">
        <p className="text-xl mb-4 text-white">Loading...</p>
        <img
          src={loadingJuggle}
          alt="cartoon of loading juggler"
          width={100}
          className="mx-auto"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-4 min-h-[calc(100vh-80px)]">
      <h1 className="text-5xl md:text-6xl font-extrabold mb-8 leading-tight text-center bg-gradient-to-r from-green-600 via-blue-400 via-green-600 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_0_3px_rgb(0,0,0)] md:drop-shadow-[0_0_4px_rgb(0,0,0)]">
        Guess the Fantastical Pet!
      </h1>

      {randomPet && (
        <div className="flex flex-col items-center w-full max-w-6xl gap-8">
          {" "}
          {/* Main container for all game sections */}
          {/* --- 1. Hybrid Image Display Section --- */}
          <div className="card bg-white bg-opacity-10 p-6 md:p-10 rounded-2xl shadow-2xl backdrop-blur-sm w-full border border-blue-400 flex flex-col items-center">

            <img
              src={randomPet.imageUrl}
              alt="Mystery Hybrid Pet"
              className="w-full max-w-xs md:max-w-sm h-auto object-cover rounded-xl border-4 border-yellow-300 shadow-xl"
            />
          </div>
          {/* --- 2. Feedback Message Section --- */}
          {feedbackMessage && (
            <div className="w-full max-w-2xl text-center">
              <p
                className={`text-xl font-bold p-3 rounded-lg ${
                  showResult
                    ? feedbackMessage.includes("Correct")
                      ? "bg-green-700 text-white"
                      : "bg-red-700 text-white"
                    : "text-yellow-300"
                }`}
              >
                {feedbackMessage}
              </p>
            </div>
          )}
          {/* --- 3. User's Current Guesses Display Section --- */}
          {!showResult && ( // Only show if result is not yet shown
            <div
              ref={selectionsRef}
              className="card bg-white bg-opacity-10 p-6 md:p-10 rounded-2xl shadow-2xl backdrop-blur-sm w-full max-w-2xl border border-pink-400 flex flex-col items-center gap-8"
            >
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-center bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">
                Your Current Guess:
              </h3>
              <div className="flex flex-wrap justify-center gap-20 min-h-[100px] items-center">
                {selectedGuesses.length === 0 && (
                  <p className="text-pink-700 font-bold text-lg opacity-80">
                    Select 2 animals below to make your guess!
                  </p>
                )}
                {selectedGuesses.map((img) => (
                  <div
                    key={img.id}
                    className="card compact bg-yellow-100 rounded-xl shadow-lg border border-blue-300 p-2 flex flex-col items-center w-30 h-42 md:w-36 md:h-46 overflow-hidden"
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-auto object-cover rounded-md mb-1 max-w-[100px] max-h-[150px] md:max-w-[120px] md:max-h-[180px]"
                    />
                    <span className="text-black text-sm font-semibold text-center mt-auto">
                      {img.alt}
                    </span>
                  </div>
                ))}
              </div>
              <button
                onClick={handleSubmitGuess}
                disabled={selectedGuesses.length !== 2}
                className={`btn btn-primary px-8 py-3 rounded-full shadow-lg transform transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary active:bg-primary-focus ${
                  selectedGuesses.length !== 2
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                } mb-8`}
              >
                Submit Guess
              </button>
            </div>
          )}
          {/* --- 4. Selection Options & Submit Section --- */}
          {!showResult && ( // Only show if result is not yet shown
            <div className="card bg-white bg-opacity-10 p-6 md:p-10 rounded-2xl shadow-2xl backdrop-blur-sm w-full border border-green-400 flex flex-col items-center">
              <div className="categories flex flex-col gap-8 w-full max-w-2xl">
                {categoriesData.map((category) => (
                  <DisplayCategory
                    key={category.name}
                    category={category}
                    selectedImages={selectedGuesses} // Pass selectedGuesses to highlight
                    onImageSelectAndScroll={handleGuessSelect} // Use guess selection handler
                  />
                ))}
              </div>
            </div>
          )}
          {/* --- 5. Play Again / Go to Collection Options Section --- */}
          {showResult && ( // Only show after result is shown
            <div className="card bg-white bg-opacity-10 p-6 md:p-10 rounded-2xl shadow-2xl backdrop-blur-sm w-full max-w-2xl border border-yellow-400 flex flex-col items-center text-center">
              <div className="flex flex-col md:flex-row justify-center gap-4 w-full">
                <button
                  onClick={handlePlayAgain}
                  className="btn bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full text-lg font-bold shadow-lg transition-transform duration-200 hover:scale-105"
                >
                  Play Again!
                </button>
                <button
                  onClick={handleGoToCollection}
                  className="btn bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-bold shadow-lg transition-transform duration-200 hover:scale-105"
                >
                  Go to My Collection
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
