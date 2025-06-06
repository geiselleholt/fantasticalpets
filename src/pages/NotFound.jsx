import notFoundCatAlien from "../images/notFoundCatAlien.gif";

export default function NotFound() {
  return (
    <>
      <h1>🚫 404 Not Found</h1>
      <img src={notFoundCatAlien} alt="Funny not found gif of cat alien" />
    </>
  );
}
