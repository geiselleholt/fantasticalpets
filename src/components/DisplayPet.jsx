import { useState } from "react";
import EditPetForm from "./EditPetForm.jsx";

export default function DisplayPet({
  pet,
  handleSaveChanges,
  handleDeletePet,
  isLoading,
  onFavoriteToggle,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const isFavorite = pet.isFavorite || false;

  const handleDeleteClick = () => {
    setShowConfirmModal(true);
  };

  const onConfirmDelete = () => {
    handleDeletePet(pet._id);
    setShowConfirmModal(false);
  };

  const onCancelDelete = () => {
    setShowConfirmModal(false);
  };

  if (isEditing) {
    return (
      <EditPetForm
        petId={pet._id}
        currentName={pet.name}
        currentDescription={pet.description}
        currentImageUrl={pet.image.imageUrl}
        handleSaveChanges={handleSaveChanges}
        handleCancelEdit={() => setIsEditing(false)}
        isLoading={isLoading}
      />
    );
  }

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
    <div className="bg-white bg-opacity-20 p-4 rounded-xl shadow-lg border border-blue-300 flex flex-col items-center text-center h-full">
      <section className="flex flex-col items-center mb-6">
        <img
          src={pet.image.imageUrl}
          alt={pet.name || "Hybrid Pet"}
          className="w-40 h-40 object-cover rounded-md mb-4 border-4 border-yellow-300 shadow-md"
        />
        <h3 className="text-xl md:text-2xl font-bold text-accent-300 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-2">
          {pet.name || ""}
        </h3>
        <p className="text-sm text-blue-800 font-bold mb-4 flex-grow">
          {pet.description || ""}
        </p>
      </section>
      <section className="flex gap-8 mt-auto">
        <span
          onClick={() => onFavoriteToggle(pet.id, isFavorite)}
          className="hover:bg-opacity-50 text-xl"
          aria-label={isFavorite ? "Unfavorite pet" : "Favorite pet"}
        >
          {isFavorite ? "❤️" : "🩶"}
        </span>
        <button
          onClick={() => setIsEditing(true)}
          disabled={isLoading}
          className="btn btn-sm btn-info text-white px-4 py-2 rounded-full shadow-md transform transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-info active:bg-info-focus"
        >
          Edit
        </button>

        <button
          onClick={handleDeleteClick}
          className="btn btn-sm btn-error text-white px-4 py-2 rounded-full shadow-md transform transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-error active:bg-error-focus"
        >
          Delete
        </button>

        {showConfirmModal && (
          <dialog id="my_modal_8" className="modal modal-open">
            <div className="modal-box text-black text-center card bg-pink-100 bg-opacity-90 p-8 rounded-xl shadow-2xl backdrop-blur-sm border border-red-400">
              <h3 className="font-bold text-lg text-red-600 mb-4">
                Confirm Deletion
              </h3>
              <p className="py-4 text-bold">
                Are you sure you want to delete "{pet.name || "this pet"}"?
              </p>
              <div className="modal-action flex justify-center gap-4">
                <button
                  onClick={onConfirmDelete}
                  className="btn btn-error text-accent"
                >
                  Yes, Delete
                </button>
                <button onClick={onCancelDelete} className="btn btn-outline">
                  Cancel
                </button>
              </div>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button onClick={onCancelDelete}>close</button>
            </form>
          </dialog>
        )}
      </section>
    </div>
  );
}
