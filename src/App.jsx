import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PetPage from "./pages/PetPage";
import CreatePage from "./pages/CreatePage";
import CollectionPage from "./pages/CollectionPage";
import SignInSignUpPage from "./pages/SignInPage";
import NotFound from "./pages/NotFound";
import NavBar from "./components/NavBar";


function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Pet" element={<PetPage />} />
        <Route path="/Create" element={<CreatePage />} />
        <Route path="/Collection" element={<CollectionPage />} />
        <Route path="/SignInSignUp" element={<SignInSignUpPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
