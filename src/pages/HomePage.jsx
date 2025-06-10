import { useNavigate } from "react-router-dom";
import bear from "../images/bear.jpeg";
import beardragon from "../images/beardragon.jpeg";
import dragon from "../images/dragon.jpeg";
import fox from "../images/fox.jpeg";
import octopus from "../images/octopus.jpeg";
import foxtopus from "../images/foxtopus.jpeg";
import lion from "../images/lion.jpeg";
import butterfly from "../images/butterfly.jpeg";
import lionbutterfly from "../images/lionbutterfly.jpeg";

export default function HomePage() {
  const nav = useNavigate();

  return (
    <div>
      <h1>Welcome to the World of Fantastical Pets!</h1>
      <div>
        <h2>Unleash Your Inner Creator</h2>
        <p>
          Choose 2 animals and combine them into one cute creature like this
          bear dragon or fox octopus or lion butterfly
        </p>
        <section className="example">
          <div>
            <section>
              <img src={bear} alt="cute bear" width={150} />
              <img src={dragon} alt="cute dragon" width={150} />
            </section>
            <img src={beardragon} alt="cute bear dragon hybrid" width={150} />
          </div>
          <div>
            <section>
              <img src={fox} alt="cute fox" width={150} />
              <img src={octopus} alt="cute octopus" width={150} />
            </section>
            <img src={foxtopus} alt="cute foxtopus hybrid" width={150} />
          </div>
          <div>
            <section>
              <img src={lion} alt="cute lion" width={150} />
              <img src={butterfly} alt="cute butterfly" width={150} />
            </section>
            <img
              src={lionbutterfly}
              alt="cute lion butterfly hybrid"
              width={150}
            />
          </div>
        </section>
      </div>
      <div>
        <p>
          Build Your Dream Collection: Save all your creature creations in your
          own personal fantastical pet family
        </p>
      </div>
      <p>
        Personalize Your Pal: Name your new friend, describe its special
        abilities, its favorite food, and its living environment
      </p>
      <h2>Ready to Get Started?</h2>
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
