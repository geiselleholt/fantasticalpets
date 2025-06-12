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

  return (
    <div>
      <h3>Edit Pet</h3>
      {currentImageUrl && (
        <img src={currentImageUrl} alt={currentName || "Pet Image"} />
      )}
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isLoading}
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="3"
          disabled={isLoading}
        ></textarea>
      </div>
      <button onClick={onSave} disabled={isLoading}>
        {isLoading ? (
          <img src={loadingJuggle} alt="loading juggler" width={100} />
        ) : (
          "Save Changes"
        )}
      </button>
      <button onClick={handleCancelEdit} disabled={isLoading}>
        Cancel
      </button>
    </div>
  );
}
