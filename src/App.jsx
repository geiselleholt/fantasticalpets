import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PetPage from "./pages/PetPage";
import CreatePage from "./pages/CreatePage";
import CollectionPage from "./pages/CollectionPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import NotFound from "./pages/NotFound";
import NavBar from "./components/NavBar";
import ProtectedRoutes from "./components/ProtectedRoutes";
import GuessingGamePage from "./pages/GuessingGamePage";


function App() {
  return (
    <div className="bg-gradient-to-br from-blue-300 via-sky-500 to-blue-800 min-h-screen font-inter text-white">
      <NavBar />
      <div className="pt-20">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/pet" element={<PetPage />} />
            <Route path="/create" element={<CreatePage />} />
            <Route path="/collection" element={<CollectionPage />} />
          </Route>
          <Route path="/guess" element={<GuessingGamePage />} />
          <Route path="/signIn" element={<SignInPage />} />
          <Route path="/signUp" element={<SignUpPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
