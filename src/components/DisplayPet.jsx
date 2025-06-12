import { useState } from "react";
import EditPetForm from "./EditPetForm.jsx";

export default function DisplayPet({
  pet,
  handleSaveChanges,
  handleDeletePet,
  isLoading,
}) {
  const [isEditing, setIsEditing] = useState(false);

  const handleDeleteConfirm = () => {
    alert("Are you sure you want to delete this pet?");
    handleDeletePet(pet._id);
  };

  if (isEditing) {
    return (
      <EditPetForm
        petId={pet._id}
        currentName={pet.name}
        currentDescription={pet.description}
        currentImageUrl={pet.image?.imageUrl}
        handleSaveChanges={handleSaveChanges}
        handleCancelEdit={() => setIsEditing(false)}
        isLoading={isLoading}
      />
    );
  }

  return (
    <div>
      {pet.image?.imageUrl && (
        <img src={pet.image.imageUrl} alt={pet.name || "Hybrid Pet"} />
      )}
      <h2>{pet.name || ""}</h2>
      <p>{pet.description || ""}</p>

      <button onClick={() => setIsEditing(true)} disabled={isLoading}>
        Edit
      </button>
      <button onClick={handleDeleteConfirm} disabled={isLoading}>
        Delete
      </button>
    </div>
  );
}
