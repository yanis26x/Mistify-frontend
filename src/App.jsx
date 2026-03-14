import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Auth from "./Auth";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
    </Routes>
  );
}