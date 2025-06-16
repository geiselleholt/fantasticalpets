import { useState, useEffect } from "react";
import loadingJuggle from "../images/loadingJuggle.gif";

export default function EditPetForm({
  petId,
  currentName,
  currentDescription,
  currentImageUrl,
  handleSaveChanges,
  handleCancelEdit,
  isLoading,
}) {
  const [name, setName] = useState(currentName);
  const [description, setDescription] = useState(currentDescription);

  useEffect(() => {
    setName(currentName);
    setDescription(currentDescription);
  }, [currentName, currentDescription]);

  const onSave = () => {
    handleSaveChanges(petId, name, description);
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
    <div className="card bg-white bg-opacity-10 p-6 rounded-2xl shadow-2xl backdrop-blur-sm border border-blue-400 flex flex-col items-center text-center w-full max-w-sm mx-auto h-full">
      <h3 className="text-xl md:text-2xl font-bold text-white bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-4">
        Edit Pet
      </h3>
      {currentImageUrl && (
        <img
          src={currentImageUrl}
          alt={currentName || "Pet Image"}
          className="w-32 h-32 object-cover rounded-md mb-4 border-2 border-yellow-300 shadow-lg"
        />
      )}
      <div className="flex flex-col gap-4 w-full">
        <label className="label text-black text-left w-full">
          <span className="label-text text-black">Name:</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isLoading}
            className="input input-bordered input-primary w-full bg-blue-50 text-black"
          />
        </label>
        <label className="label text-black text-left w-full">
          <span className="label-text text-black">Description:</span>{" "}
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
            disabled={isLoading}
            className="textarea textarea-bordered textarea-primary w-full bg-blue-50 text-black"
          ></textarea>
        </label>
      </div>
      <div className="flex gap-4 mt-6">
        <button
          onClick={onSave}
          disabled={isLoading}
          className="btn btn-primary px-6 py-2 rounded-full shadow-lg transform transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary active:bg-primary-focus"
        >Save
        </button>
        <button
          onClick={handleCancelEdit}
          disabled={isLoading}
          className="btn btn-secondary px-6 py-2 rounded-full shadow-lg transform transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-secondary active:bg-secondary-focus"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
