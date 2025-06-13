import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const nav = useNavigate();

  return (
    <div className=" flex flex-col items-center justify-center p-4  ">
      <div className="text-center mb-12 max-w-6xl w-full">
        <h1
          className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight
                       bg-gradient-to-r from-blue-100 via-yellow-400 via-accent-500 to-pink-500 bg-clip-text text-transparent
                       drop-shadow-[0_0_3px_rgb(0,0,0)] md:drop-shadow-[0_0_4px_rgb(0,0,0)]"
        >
          Welcome to the World of <br /> Fantastical Pets!
        </h1>
        {/* <p className="text-3xl md:text-2xl opacity-90 text-purple-700">
          Where your imagination creates the most amazing creatures...
        </p> */}
        <p className="text-3xl md:text-3xl opacity-90 text-purple-700 animate-spin-slow">
          Where your imagination creates the most amazing creatures...
        </p>
      </div>
      <div className="card bg-white bg-opacity-10 p-6 md:p-10 rounded-2xl shadow-2xl backdrop-blur-sm max-w-5xl w-full mb-12 border border-blue-400">
        <h2
          className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-md text-center
                         bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent"
        >
          Unleash Your Creativity
        </h2>
        <p className="text-lg md:text-xl mb-8 text-center text-green-700">
          Choose 2 animals and combine them into one adorable creature like
          this:
        </p>

        <section className="flex flex-wrap justify-center gap-8 mb-8 ">
          <div className="card compact bg-yellow-100 bg-opacity-20 rounded-xl shadow-xxlg border border-blue-300 p-4 flex flex-col items-center">
            <section className="flex mb-4">
              <img
                src="https://images.deepai.org/art-image/94e1fea3887b49fd8518af6e1b41bdee/cartoon-image-of-a-cute-bear-80c20b.jpg"
                alt="cute bear"
                className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-full border-2 border-yellow-300 shadow-md mr-2"
              />
              <span className="text-4xl md:text-5xl font-extrabold text-yellow-300 self-center mx-2">
                +
              </span>
              <img
                src="https://images.deepai.org/art-image/376a5e31c16f429f916936a544f06169/cartoon-image-of-a-cute-dragon-a80647.jpg"
                alt="cute dragon"
                className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-full border-2 border-red-400 shadow-md ml-2"
              />
            </section>
            <img
              src="https://images.deepai.org/art-image/eee0ead1a9bd41cab17c86d168899758/cartoon-image-of-a-cute-smiling-bear-dragon-hybrid-ec.jpg"
              alt="cute bear dragon hybrid"
              className="w-32 h-32 md:w-48 md:h-48 object-cover rounded-xl border-4 border-purple-400 shadow-xl"
            />
            <p className="mt-2 text-sm md:text-base font-semibold text-black">
              Bear + Dragon = Beary Firey
            </p>
          </div>

          <div className="card compact bg-yellow-100 bg-opacity-20 rounded-xl shadow-lg border border-blue-300 p-4 flex flex-col items-center">
            <section className="flex mb-4">
              <img
                src="https://images.deepai.org/art-image/67f3809664884a6695418a1198ea1974/cartoon-image-of-a-cute-fox.jpg"
                alt="cute fox"
                className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-full border-2 border-orange-300 shadow-md mr-2"
              />
              <span className="text-4xl md:text-5xl font-extrabold text-orange-300 self-center mx-2">
                +
              </span>
              <img
                src="https://images.deepai.org/art-image/1fe148baeec847a3bcbb180fe8d4f3f0/cartoon-image-of-a-cute-octopus.jpg"
                alt="cute octopus"
                className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-full border-2 border-purple-400 shadow-md ml-2"
              />
            </section>
            <img
              src="https://images.deepai.org/art-image/7a74c628f7944606a559fed526844df1/cartoon-image-of-a-cute-smiling-fox-octopus-hybrid-wi.jpg"
              alt="cute foxtopus hybrid"
              className="w-32 h-32 md:w-48 md:h-48 object-cover rounded-xl border-4 border-pink-400 shadow-xl"
            />
            <p className="mt-2 text-sm md:text-base font-semibold text-black">
              Fox + Octopus = Foxtopous
            </p>
          </div>

          <div className="card compact bg-yellow-100 bg-opacity-20 rounded-xl shadow-lg border border-blue-300 p-4 flex flex-col items-center">
            <section className="flex mb-4">
              <img
                src="https://images.deepai.org/art-image/5c156fa98ae24a47b773246b0bc49d83/cartoon-image-of-a-cute-lion.jpg"
                alt="cute lion"
                className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-full border-2 border-amber-300 shadow-md mr-2"
              />
              <span className="text-4xl md:text-5xl font-extrabold text-amber-300 self-center mx-2">
                +
              </span>
              <img
                src="https://images.deepai.org/art-image/e68605ff26b348eeb1afa2de7fe7b952/cartoon-image-of-a-cute-butterfly-4ace05.jpg"
                alt="cute butterfly"
                className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-full border-2 border-emerald-400 shadow-md ml-2"
              />
            </section>
            <img
              src="https://images.deepai.org/art-image/2159579388514583839276522f6d7673/cartoon-image-of-a-cute-butterfly-lion-hybrid-263152.jpg"
              alt="cute lion butterfly hybrid"
              className="w-32 h-32 md:w-48 md:h-48 object-cover rounded-xl border-4 border-yellow-200 shadow-xl"
            />
            <p className="mt-2 text-sm md:text-base font-semibold text-black">
              Lion + Butterfly = Flutter Flutter Roar Roar
            </p>
          </div>
        </section>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 mb-12 w-full px-4 md:max-w-none">
        <div className="card bg-white bg-opacity-10 p-6 md:p-10 rounded-2xl shadow-2xl backdrop-blur-sm w-full md:flex-1 mb-8 md:mb-0">
          <h2
            className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-md text-center
                         bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent"
          >
            Build Your Dream Collection
          </h2>
          <p className="text-lg md:text-xl text-purple-700 opacity-90 max-w-md mx-auto text-black">
            Save all your creature creations in your own personal fantastical
            pet family!
          </p>
        </div>

        <div className="card bg-white bg-opacity-10 p-6 md:p-10 rounded-2xl shadow-2xl backdrop-blur-sm w-full md:flex-1">
          <h2
            className="text-3xl md:text-4xl font-bold opacity-90 text-center
                         bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"
          >
            Make Your Pet Truly Fantastic
          </h2>
          <p className="text-lg md:text-xl text-purple-700 opacity-90 max-w-md mx-auto text-black mt-4 mb-2">
            What's its name? What amazing adventures does it have? What's its
            favorite snack? You Decide!
          </p>
          <p className="text-lg md:text-xl text-blue-600 opacity-90 max-w-md mx-auto text-black">
            If you like surprises, our magical wizard can invent a cute name and
            silly description for you!
          </p>
        </div>
      </div>
      <h2
        className="text-3xl md:text-4xl font-bold opacity-90 text-center
                         text-yellow-400 bg-clip-text text-transparent"
      >
        Ready to get started?
      </h2>
      <p>~~~~~~~~~~</p>
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => nav("/signUp")}
          className="btn btn-accent btn-lg px-8 py-3 rounded-full shadow-lg transform transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary active:bg-primary-focus"
        >
          Sign Up
        </button>
        <button
          onClick={() => nav("/signIn")}
          className="btn btn-secondary btn-lg px-8 py-3 rounded-full shadow-lg transform transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-secondary active:bg-secondary-focus"
        >
          Sign In
        </button>
      </div>
    </div>
  );
}
