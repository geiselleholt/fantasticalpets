export default function DisplayCategory({
  category,
  selectedImages,
  onImageSelectAndScroll,
}) {
  return (
    <div className="card bg-white bg-opacity-10 p-6 md:p-10 rounded-2xl shadow-2xl backdrop-blur-sm max-w-full w-full border border-blue-400">
      <h3
        className="text-3xl md:text-4xl font-bold mb-6 text-center drop-shadow-md
                     bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"
      >
        {category.name}
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-5 gap-1 justify-evenly">
        {category.images.map((image) => {
          const isSelected = selectedImages.some((img) => img.id === image.id);
          return (
            <div
              key={image.id}
              onClick={() => onImageSelectAndScroll(image)}
              className={`
                cursor-pointer relative transform transition-transform duration-200 hover:scale-105
                flex flex-col items-center p-3 rounded-lg shadow-md border border-blue-300
                ${
                  isSelected
                    ? "bg-yellow-100 border-4 border-primary"
                    : "bg-white bg-opacity-20"
                } /* Conditional background color */
              `}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-32 object-cover rounded-md mb-2"
              />
              <span className="text-sm font-semibold text-black text-center">
                {image.alt}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
