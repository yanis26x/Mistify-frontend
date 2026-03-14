import { Routes, Route } from "react-router-dom";
import Home from "./home/Home";
import Auth from "./auth/Auth";
import VendreParfum from "./parfum/VendreParfum";
import Commentaire from "./commentaire/Commentaire";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/vendreParfum" element={<VendreParfum/>}/>
      <Route path="/Commentaire" element={<Commentaire/>}/>
    </Routes>
  );
}