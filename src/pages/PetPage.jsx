import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import axios from "axios";
import loadingJuggle from "../images/loadingJuggle.gif";

export default function PetPage() {
  const location = useLocation();
  const nav = useNavigate();
  const { cookies } = useAuth();

  const hybridAnimals = location.state?.hybridAnimals || [];
  const animal1 = hybridAnimals[0]?.alt;
  const animal2 = hybridAnimals[1]?.alt;

  const [petImageUrl, setPetImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [petName, setPetName] = useState("");
  const [petDescription, setPetDescription] = useState("");

  const API_BASE_URL = "http://localhost:3000/api";

  const getHybridImage = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/image`, {
        animal1,
        animal2,
      });
      setPetImageUrl(response.data.imageUrl);
    } catch (err) {
      console.error(err);
      alert(err.message);
      setPetImageUrl("");
      return;
    } finally {
      setIsLoading(false);
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

  useEffect(() => {
    setIsLoading(true);
    setPetImageUrl("");
    getHybridImage();
  }, []);

  return (
    <>
      <h1>Your Fantastical Hybrid Pet!</h1>
      {isLoading && (
        <div>
          <img
            src={loadingJuggle}
            alt="cartoon of loading juggler"
            width={100}
          />
        </div>
      )}
      {petImageUrl && (
        <>
          <img src={petImageUrl} alt={`Hybrid of ${animal1} and ${animal2}`} />
          <div className="savePet">
            <section>
              <h3>Do you like it?</h3>
              <ul>
                <li>
                  <input
                    type="text"
                    placeholder="Pet Name (optional)"
                    value={petName}
                    onChange={(e) => setPetName(e.target.value)}
                  />
                </li>
                <li>
                  <textarea
                    placeholder="Describe your pet (optional)"
                    value={petDescription}
                    onChange={(e) => setPetDescription(e.target.value)}
                    rows="3"
                  ></textarea>
                </li>
              </ul>
              <button onClick={handleSaveToCollection} disabled={isLoading}>
                {isLoading ? (
                  <div>
                    <img
                      src={loadingJuggle}
                      alt="cartoon of loading juggler"
                      width={100}
                    />
                  </div>
                ) : (
                  "Save to Your Collection"
                )}
              </button>
            </section>

            <section>
              <h3>Don't Like It?</h3>
              <button onClick={() => nav("/create")}>
                Create Another Hybrid
              </button>
              <button onClick={() => nav("/collection")}>
                Go To Your Collection
              </button>
            </section>
          </div>
        </>
      )}
    </>
  );
}
