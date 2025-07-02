import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import HomePage from "./pages/Home";
import PlayPage from "./pages/Play";
import Success from "./pages/Success";
import GameOver from "./pages/GameOver";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/play/:sessionId" element={<PlayPage />} />
        <Route path="/success" element={<Success />} />
        <Route path="/game-over" element={<GameOver />} />
      </Routes>
      <ToastContainer position="bottom-right" />
    </BrowserRouter>
  );
}
