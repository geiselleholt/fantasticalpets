import notFoundCatAlien from "../images/notFoundCatAlien.gif";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const nav = useNavigate();

  return (
    <>
      <div className=" flex flex-col items-center justify-center p-4 min-h-[calc(100vh-80px)]">
        <h1
          className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight
                       bg-gradient-to-r from-blue-100 via-yellow-400 via-accent-500 to-pink-500 bg-clip-text text-transparent
                       drop-shadow-[0_0_3px_rgb(0,0,0)] md:drop-shadow-[0_0_4px_rgb(0,0,0)] animate-gradient-text"
        >
          🚫 404 Not Found
        </h1>
        <img src={notFoundCatAlien} alt="Funny not found gif of cat alien" />
        <button
          onClick={() => {
            nav("/");
          }}
          className="btn btn-secondary px-6 py-2 rounded-full shadow-lg transform transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-secondary active:bg-secondary-focus"
        >
          Back to Home
        </button>
      </div>
    </>
  );
}
