import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import loadingJuggle from "../images/loadingJuggle.gif";

export default function PetDetailsForm({
  animal1,
  animal2,
  petImageUrl,
  cookies,
}) {
  const nav = useNavigate();
  const [petName, setPetName] = useState("");
  const [petDescription, setPetDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const API_BASE_URL = "http://localhost:3000/api";

  const generateAIName = async () => {
    try {
      const aiResponse = await axios.post(`${API_BASE_URL}/pet/aiDetails`, {
        animal1,
        animal2,
      });
      setPetName(aiResponse.data.name);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const generateAIDescription = async () => {
    try {
      const aiResponse = await axios.post(`${API_BASE_URL}/pet/aiDetails`, {
        animal1,
        animal2,
      });
      setPetDescription(aiResponse.data.description);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const handleSaveToCollection = async () => {
    setIsLoading(true);

    try {
      await axios.post(
        `${API_BASE_URL}/pet`,
        {
          name: petName,
          description: petDescription,
          animal1: animal1,
          animal2: animal2,
          imageUrl: petImageUrl,
        },
        {
          headers: {
            "x-auth-token": cookies.token,
          },
        }
      );
      nav("/collection");
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
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
    <section className="flex-1 card bg-white bg-opacity-20 p-5 rounded-lg shadow-inner flex flex-col gap-4 border border-green-800 ">
      <h3 className="text-2xl font-bold text-center text-green-500 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
        Give Your Pet an Identity!
      </h3>
      <div>
        <label
          htmlFor="petName"
          className="block text-white text-md font-semibold mb-1"
        >
          Name:
        </label>
        <input
          type="text"
          id="petName"
          placeholder="Pet Name (optional)"
          value={petName}
          onChange={(e) => setPetName(e.target.value)}
          className="input input-bordered input-primary w-full bg-blue-50 text-black font-bold placeholder-gray-500"
        />
        <div className="flex justify-center w-full">
          <button
            onClick={generateAIName}
            disabled={isLoading}
            className="mt-2 btn bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-full text-sm shadow-md transition-transform duration-200 hover:scale-105 "
          >
            Let Us Name Your Pet!
          </button>
        </div>
      </div>
      <div>
        <label
          htmlFor="petDescription"
          className="block text-white text-md font-semibold mb-1"
        >
          Description:
        </label>
        <textarea
          id="petDescription"
          placeholder="Describe your pet (optional)"
          value={petDescription}
          onChange={(e) => setPetDescription(e.target.value)}
          rows="3"
          className="textarea textarea-bordered textarea-primary w-full bg-blue-50 text-black font-bold placeholder-gray-500"
        ></textarea>
        <div className="flex justify-center w-full">
          <button
            onClick={generateAIDescription}
            disabled={isLoading}
            className="mt-2 btn bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-full text-sm shadow-md transition-transform duration-200 hover:scale-105 "
          >
            Let Us Describe Your Pet!
          </button>
        </div>
      </div>
      <button
        onClick={handleSaveToCollection}
        disabled={isLoading}
        className="btn btn-primary w-full text-lg py-3 rounded-full shadow-lg transform transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary active:bg-primary-focus"
      >
        Save to Your Collection
      </button>
    </section>
  );
}
