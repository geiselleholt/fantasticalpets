export default function DisplayCategory({ category, onImageSelect }) {
  return (
    <div>
      <h3>{category.name}</h3>
      <div>
        {category.images.map((image) => {
          return (
            <div key={image.id} onClick={() => onImageSelect(image)}>
              <img src={image.src} alt={image.alt} width={100}/>
              <div>
                <span>{image.alt}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
