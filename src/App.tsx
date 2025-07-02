import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import HomePage from "./pages/Home";
import PlayPage from "./pages/Play";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/play/:sessionId" element={<PlayPage />} />
      </Routes>
      <ToastContainer position="bottom-right" />
    </BrowserRouter>
  );
}
