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
    setIsLoading(true);

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
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveToCollection = async () => {
    setIsLoading(true);

    try {

      if (!petName || !petDescription) {
        const aiResponse = await axios.post(`${API_BASE_URL}/pet/aiDetails`, {
          animal1,
          animal2,
        });

        if (!petName) {
          setPetName(aiResponse.data.name);
        }
        if (!petDescription) {
          setPetDescription(aiResponse.data.description);
        }
      }

      await axios.post(
        `${API_BASE_URL}/pet`,
        {
          name: petDescription,
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
    <div className="flex flex-col items-center justify-center p-4 min-h-[calc(100vh-80px)]">
      <h1
        className="text-5xl md:text-6xl font-extrabold mb-8 leading-tight text-center
                     bg-gradient-to-r from-green-600 via-blue-400 via-green-600 to-blue-500 bg-clip-text text-transparent
                     drop-shadow-[0_0_3px_rgb(0,0,0)] md:drop-shadow-[0_0_4px_rgb(0,0,0)]"
      >
        Your Fantastical Hybrid Pet!
      </h1>

      {petImageUrl && (
        <div className="card bg-white bg-opacity-10 p-6 md:p-10 rounded-2xl shadow-2xl backdrop-blur-sm max-w-2xl w-full mb-12 border border-blue-400 flex flex-col items-center">
          <h2
            className="text-3xl md:text-4xl font-bold mb-6 text-center drop-shadow-md
                         bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent"
          >
            Here's Your New Pet!
          </h2>
          <img
            src={petImageUrl}
            alt={`Hybrid of ${animal1} and ${animal2}`}
            className="w-full max-w-xs md:max-w-sm h-auto object-cover rounded-xl border-4 border-yellow-300 shadow-xl mb-6"
          />
          <div>
            <p className="text-pink-700 text-bold text-center text-md mb-2 max-w-prose mx-auto">
              Want a fun surprise? <br /> Let our magical wizard can conjure a
              cute name and silly description for you!
            </p>
            <p className="text-pink-700 text-center text-md max-w-prose mx-auto">
              Simply leave the name and/or description fields empty, and hit{" "}
              <br /> "Save to Your Collection."
            </p>
          </div>
          <div className="w-full flex flex-col md:flex-row gap-2">
            <section className="flex-1 card bg-white bg-opacity-20 p-5 rounded-lg shadow-inner flex flex-col gap-4">
              <h3 className="text-2xl font-bold text-center text-green-500 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                Do you like it?
              </h3>
              <ul className="flex flex-col gap-4">
                <li>
                  <input
                    type="text"
                    placeholder="Pet Name (optional)"
                    value={petName}
                    onChange={(e) => setPetName(e.target.value)}
                    className="input input-bordered input-primary w-full bg-blue-50 text-black"
                  />
                </li>
                <li>
                  <textarea
                    placeholder="Describe your pet (optional)"
                    value={petDescription}
                    onChange={(e) => setPetDescription(e.target.value)}
                    rows="3"
                    className="textarea textarea-bordered textarea-primary w-full bg-blue-50 text-black"
                  ></textarea>
                </li>
              </ul>
              <button
                onClick={handleSaveToCollection}
                disabled={isLoading}
                className="btn btn-primary w-full text-lg py-3 rounded-full shadow-lg transform transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary active:bg-primary-focus"
              >
                {isLoading ? (
                  <div>
                    <img
                      src={loadingJuggle}
                      alt="cartoon of loading juggler"
                      width={100}
                      className="mx-auto"
                    />
                  </div>
                ) : (
                  "Save to Your Collection"
                )}
              </button>
            </section>
            <section className="flex-1 card bg-white bg-opacity-20 p-5 rounded-lg shadow-inner flex flex-col gap-4 justify-center items-center">
              <h3 className="text-2xl font-bold text-center text-purple-500
               bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent">
                Don't Like It?
              </h3>
              <button
                onClick={() => nav("/create")}
                className="btn btn-accent px-8 py-3 rounded-full shadow-lg transform transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-accent active:bg-accent-focus"
              >
                Create Another Hybrid
              </button>
              <button
                onClick={() => nav("/collection")}
                className="btn btn-secondary px-8 py-3 rounded-full shadow-lg transform transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-secondary active:bg-secondary-focus"
              >
                Go To Your Collection
              </button>
            </section>
          </div>
        </div>
      )}
    </div>
  );
}
