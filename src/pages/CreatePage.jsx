import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DisplayCategory from "../components/DisplayCategory";
import categoriesData from "../data/categoriesData";

export default function CreatePage() {
  const navigate = useNavigate();
  const [selectedImages, setSelectedImages] = useState([]);

  const handleImageSelect = (image) => {
    setSelectedImages((prevSelected) => {
      const isAlreadySelected = prevSelected.some((img) => img.id === image.id);

      if (isAlreadySelected) {
        return prevSelected.filter((img) => img.id !== image.id);
      } else {
        if (prevSelected.length < 2) {
          return [...prevSelected, image];
        } else {
          const newSelection = [...prevSelected.slice(1), image];
          return newSelection;
        }
      }
    });
  };

  const handleSubmit = () => {
    if (selectedImages.length === 2) {
      navigate("/pet", { state: { hybridAnimals: selectedImages } });
    } else {
      alert("Please select 2 animals");
    }
  };

  return (
    <div>
      <div>
        <h1>Create Station</h1>
        <p>
          Select 2 animals from any category below to combine their unique
          traits and create your own amazing creature!
        </p>

        <div>
          <h2>Your Selections:</h2>
          <section className="selections">
            {selectedImages.map((img) => (
              <div key={img.id}>
                <img src={img.src} alt={img.alt} width={150} />
                <div>
                  <span>{img.alt}</span>
                </div>
              </div>
            ))}
          </section>
        </div>

        <div>
          <button onClick={handleSubmit} disabled={selectedImages.length !== 2}>
            See Your Fantastical Pet
          </button>
        </div>

        <div className="categories">
          {categoriesData.map((category) => (
            <DisplayCategory
              key={category.name}
              category={category}
              onImageSelect={handleImageSelect}
              selectedImages={selectedImages}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
