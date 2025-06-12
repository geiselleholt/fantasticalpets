import { useNavigate } from "react-router-dom";

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
              <img
                src="https://images.deepai.org/art-image/94e1fea3887b49fd8518af6e1b41bdee/cartoon-image-of-a-cute-bear-80c20b.jpg"
                alt="cute bear"
                width={150}
              />
              <img
                src="https://images.deepai.org/art-image/376a5e31c16f429f916936a544f06169/cartoon-image-of-a-cute-dragon-a80647.jpg"
                alt="cute dragon"
                width={150}
              />
            </section>
            <img
              src="https://images.deepai.org/art-image/eee0ead1a9bd41cab17c86d168899758/cartoon-image-of-a-cute-smiling-bear-dragon-hybrid-ec.jpg"
              alt="cute bear dragon hybrid"
              width={150}
            />
          </div>
          <div>
            <section>
              <img
                src="https://images.deepai.org/art-image/67f3809664884a6695418a1198ea1974/cartoon-image-of-a-cute-fox.jpg"
                alt="cute fox"
                width={150}
              />
              <img
                src="https://images.deepai.org/art-image/1fe148baeec847a3bcbb180fe8d4f3f0/cartoon-image-of-a-cute-octopus.jpg"
                alt="cute octopus"
                width={150}
              />
            </section>
            <img
              src="https://images.deepai.org/art-image/7a74c628f7944606a559fed526844df1/cartoon-image-of-a-cute-smiling-fox-octopus-hybrid-wi.jpg"
              alt="cute foxtopus hybrid"
              width={150}
            />
          </div>
          <div>
            <section>
              <img
                src="https://images.deepai.org/art-image/5c156fa98ae24a47b773246b0bc49d83/cartoon-image-of-a-cute-lion.jpg"
                alt="cute lion"
                width={150}
              />
              <img
                src="https://images.deepai.org/art-image/e68605ff26b348eeb1afa2de7fe7b952/cartoon-image-of-a-cute-butterfly-4ace05.jpg"
                alt="cute butterfly"
                width={150}
              />
            </section>
            <img
              src="https://images.deepai.org/art-image/2159579388514583839276522f6d7673/cartoon-image-of-a-cute-butterfly-lion-hybrid-263152.jpg"
              alt="cute lion butterfly hybrid"
              width={150}
            />
          </div>
        </section>
      </div>
      <div>
        <p>Build Your Dream Collection!</p>
        <p>
          Save all your creature creations in your own personal fantastical pet
          family
        </p>
      </div>
      <p>Make your pet truly fantastic!</p>
      <p>
        What's its name? What amazing adventures does it have? What's its favorite snack? You decide! Or, if you like surprises, our magical AI can invent a cute name and a silly description for you!
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
