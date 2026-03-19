import { Routes, Route } from "react-router-dom";
import Home from "./home/Home";
import VendreParfum from "./parfum/VendreParfum";
import Commentaire from "./commentaire/Commentaire";
import Compte from "./account/Compte";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/vendreParfum" element={<VendreParfum/>}/>
      <Route path="/Commentaire" element={<Commentaire/>}/>
      <Route path="/compte" element={<Compte/>}/>
    </Routes>
  );
}