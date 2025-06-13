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

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/pet" element={<PetPage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/collection" element={<CollectionPage />} />
        </Route>
        <Route path="/signIn" element={<SignInPage />} />
        <Route path="/signUp" element={<SignUpPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
