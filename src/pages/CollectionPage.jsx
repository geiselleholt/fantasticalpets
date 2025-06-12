import { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import loadingJuggle from "../images/loadingJuggle.gif";
import DisplayPet from "../components/DisplayPet.jsx";

export default function CollectionPage() {
  const { cookies } = useAuth();
  const nav = useNavigate();

  const [pets, setPets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const API_BASE_URL = "http://localhost:3000/api";

  const getPets = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get(`${API_BASE_URL}/pet/user`, {
        headers: {
          "x-auth-token": cookies.token,
        },
      });
      setPets(response.data);
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
      <div>
        <img src={loadingJuggle} alt="cartoon of loading juggler" width={100} />
      </div>
    );
  }

  return (
    <div>
      <h1>Your Fantastical Pet Family</h1>
      {pets.length === 0 ? (
        <div>
          <p>You don't have any pets in your collection yet!</p>
          <button onClick={() => nav("/create")}>
            Create Your First Fantastical Pet
          </button>
        </div>
      ) : (
        <>
          <button onClick={() => nav("/create")}>
            Create More Fantasical Pets
          </button>
          <div className="petContainer">
            {pets.map((pet) => (
              <div key={pet._id}>
                <DisplayPet
                  pet={pet}
                  handleSaveChanges={handleSaveChanges}
                  handleDeletePet={handleDeletePet}
                  isLoading={isLoading}
                />
              </div>
            ))}
          </div>
        </>
      )}
      <div></div>
    </div>
  );
}
