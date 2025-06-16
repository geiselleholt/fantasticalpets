import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import DisplayCategory from "../components/DisplayCategory";
import categoriesData from "../data/categoriesData";

export default function CreatePage() {
  const nav = useNavigate();
  const [selectedImages, setSelectedImages] = useState([]);
  const selectionsRef = useRef(null);

  const handleImageSelect = (image) => {
    setSelectedImages((prevSelected) => {
      const isAlreadySelected = prevSelected.some(
        (img) => img && img.id === image.id
      );

      if (isAlreadySelected) {
        return prevSelected.filter((img) => img && img.id !== image.id);
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

  const handleImageSelectAndScroll = (image) => {
    handleImageSelect(image);
    if (selectionsRef.current) {
      selectionsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  const handleSubmit = () => {
    if (selectedImages.length === 2) {
      nav("/pet", { state: { hybridAnimals: selectedImages } });
    } else {
      alert("Please select 2 animals");
    }
  };

  return (
    <div className=" flex flex-col items-center justify-center p-4  ">
      <div className="text-center mb-12 max-w-6xl w-full">
        <h1
          className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight
                     bg-gradient-to-r from-pink-400 to-green-500 bg-clip-text text-transparent
                     drop-shadow-[0_0_3px_rgb(0,0,0)] md:drop-shadow-[0_0_4px_rgb(0,0,0)] animate-pulse-subtle "
        >
          Create Your Fantastical Pet!
        </h1>
      </div>

      <div
        ref={selectionsRef}
        className="card bg-white bg-opacity-10 p-6 md:p-10 rounded-2xl shadow-2xl backdrop-blur-sm max-w-2xl w-full mb-12 border border-blue-400"
      >
        <h2
          className="text-3xl md:text-4xl font-bold mb-6 text-center drop-shadow-md
                       bg-gradient-to-r from-accent to-accent bg-clip-text text-transparent"
        >
          Your Selections
        </h2>
        <section className="flex flex-wrap justify-center gap-4 min-h-[150px] items-center">
          {selectedImages.length === 0 && (
            <p className="text-pink-700 font-bold text-lg opacity-80">
              Select 2 animals to create your own amazing creature!
            </p>
          )}
          {selectedImages.map((img) => (
            <div
              key={img.id}
              className="card compact bg-yellow-100 rounded-xl shadow-lg border border-blue-300 p-4 flex flex-col items-center"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-md mb-2"
              />
              <span className="text-black text-sm font-semibold text-center">
                {img.alt}
              </span>
            </div>
          ))}
        </section>
      </div>

      {selectedImages.length === 2 && (
        <div className="text-center mb-12">
          <button
            onClick={handleSubmit}
            className="btn btn-primary btn-lg px-8 py-3 rounded-full shadow-lg transform transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary active:bg-primary-focus"
          >
            See Your Fantastical Pet
          </button>
        </div>
      )}

      <div className="categories grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-2 gap-8 w-full max-w-screen-2xl">
        {categoriesData.map((category) => (
          <DisplayCategory
            key={category.name}
            category={category}
            selectedImages={selectedImages}
            onImageSelectAndScroll={handleImageSelectAndScroll}
          />
        ))}
      </div>
    </div>
  );
}
