import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import axios from "axios";
import loadingJuggle from "../images/loadingJuggle.gif";
import DisplayPet from "../components/DisplayPet.jsx";

export default function CollectionPage() {
  const { cookies } = useAuth();
  const nav = useNavigate();

  const [pets, setPets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const API_BASE_URL = "https://fantasicalpetsbackend.onrender.com/api";

  const getPets = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get(`${API_BASE_URL}/pet/user`, {
        headers: {
          "x-auth-token": cookies.token,
        },
      });

      const petsData = response.data.map((pet) => ({
        ...pet,
        imageUrl: pet.image?.imageUrl,
        id: pet._id,
      }));
      const sortedPets = petsData.sort((a, b) => {
        if (a.isFavorite && !b.isFavorite) return -1;
        if (!a.isFavorite && b.isFavorite) return 1;
        return 0;
      });

      setPets(sortedPets);
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPets();
  }, []);

    const handleFavoriteToggle = useCallback(
      async (petId, currentFavoriteStatus) => {
        try {
          await axios.put(
            `${API_BASE_URL}/pet/${petId}`,
            { isFavorite: !currentFavoriteStatus },
            {
              headers: {
                "x-auth-token": cookies.token,
              },
            }
          );
  
          getPets();
        } catch (err) {
          console.error("Error updating favorite status: ", err);
        }
      }
    );

  const handleSaveChanges = async (petId, newName, newDescription) => {
    setIsLoading(true);

    try {
      await axios.put(
        `${API_BASE_URL}/pet/${petId}`,
        { name: newName, description: newDescription },
        {
          headers: {
            "x-auth-token": cookies.token,
          },
        }
      );

      await getPets();
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeletePet = async (petId) => {
    setIsLoading(true);

    try {
      await axios.delete(`${API_BASE_URL}/pet/${petId}`, {
        headers: {
          "x-auth-token": cookies.token,
        },
      });

      setPets(pets.filter((pet) => pet._id !== petId));
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
        <p className="text-xl mb-4 text-white">
          Loading your fantastical collection...
        </p>
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
      <h1
        className="text-5xl md:text-6xl font-extrabold mb-8 leading-tight text-center
                     bg-gradient-to-r from-purple-600 via-blue-400 via-green-600 to-pink-500 bg-clip-text text-transparent
                     drop-shadow-[0_0_3px_rgb(0,0,0)] md:drop-shadow-[0_0_4px_rgb(0,0,0)] animate-gradient-text"
      >
        Your Fantastical Pet Family
      </h1>

      {pets.length === 0 ? (
        <div className="card bg-white bg-opacity-10 p-6 md:p-10 rounded-2xl shadow-2xl backdrop-blur-sm max-w-xl w-full mb-12 border border-blue-400 text-center flex flex-col items-center">
          <p className="text-lg md:text-xl opacity-90 text-black mb-6">
            You don't have any pets in your collection yet!
          </p>
          <button
            onClick={() => nav("/create")}
            className="btn btn-primary btn-lg px-8 py-3 rounded-full shadow-lg transform transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary active:bg-primary-focus"
          >
            Create Your First Fantastical Pet
          </button>
        </div>
      ) : (
        <>
          <button
            onClick={() => nav("/create")}
            className="btn btn-accent btn-lg px-8 py-3 rounded-full shadow-lg transform transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-accent active:bg-accent-focus mb-12"
          >
            Create More Fantastical Pets
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full max-w-6xl">
            {pets.map((pet) => (
              <div key={pet._id} className="w-full">
                <DisplayPet
                  pet={pet}
                  handleSaveChanges={handleSaveChanges}
                  handleDeletePet={handleDeletePet}
                  isLoading={isLoading}
                  onFavoriteToggle={handleFavoriteToggle}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
