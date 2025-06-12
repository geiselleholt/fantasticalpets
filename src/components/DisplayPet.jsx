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
        currentImageUrl={pet.image.imageUrl}
        handleSaveChanges={handleSaveChanges}
        handleCancelEdit={() => setIsEditing(false)}
        isLoading={isLoading}
      />
    );
  }

  return (
    <div className="petCard">
      <section>
        <img
          src={pet.image.imageUrl}
          alt={pet.name || "Hybrid Pet"}
          width={100}
        />
        <h3>{pet.name || ""}</h3>
        <p>{pet.description || ""}</p>
      </section>
      <section>
        <button onClick={() => setIsEditing(true)} disabled={isLoading}>
          Edit
        </button>
        <button onClick={handleDeleteConfirm} disabled={isLoading}>
          Delete
        </button>
      </section>
    </div>
  );
}
