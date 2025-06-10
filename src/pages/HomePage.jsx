import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const nav = useNavigate();

  return (
    <div>
      <h1>Welcome to the World of Fantastical Pets!</h1>

      <h2>Unleash Your Inner Creator</h2>
      <p>
        Personalize Your Pal: Name your new friend, describe its special
        abilities, its favorite food, and its living environment
      </p>
      <p>
        Build Your Dream Collection: Save all your creature creations in your
        own personal fantastical pet family
      </p>
      <h2>
        Ready to Get Started?
      </h2>
      <div>
        <button
          onClick={() => {
            nav("/signUp");
          }}
        >
          Sign Up
        </button>
        <button
          onClick={() => {
            nav("/signIn");
          }}
        >
          Sign In
        </button>
      </div>
    </div>
  );
}
