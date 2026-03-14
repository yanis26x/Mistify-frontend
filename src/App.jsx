import { Routes, Route } from "react-router-dom";
import Home from "./home/Home";
import Auth from "./auth/Auth";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
    </Routes>
  );
}