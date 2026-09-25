import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import ProfilePage from "./Pages/ProfilePage";
import RegisterPage from "./Pages/RegisterPage";
import ProtectedRoute from "./Routes/ProtectedRoute";
import NotFoundPage from "./Pages/NotFoundPage ";
import UploadPage from "./Pages/UploadPage";
import AboutPage from "./Pages/AboutPage";
import PaperPage from "./Pages/PaperPage";
import Navebar from "./Components/Navebar";
import Footer from "./Components/Footer";
import TopProgressBar from "./Components/TopProgressBar";

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col">
        <TopProgressBar />
        <Navebar />
        <main className="flex flex-1 flex-col">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/papers" element={<PaperPage />} />

            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/upload"
              element={
                <ProtectedRoute>
                  <UploadPage />
                </ProtectedRoute>
              }
            />
            <Route path="/signup" element={<RegisterPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
