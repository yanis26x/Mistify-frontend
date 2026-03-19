import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import VendreParfum from "./pages/vendre/VendreParfum";
import Commentaire from "./commentaire/Commentaire";
import Compte from "./pages/account/Compte";
import SavoirPlusParfum from "./pages/savoirPlusParfum/SavoirPlusParfum";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/vendreParfum" element={<VendreParfum />} />
      <Route path="/Commentaire" element={<Commentaire />} />
      <Route path="/compte" element={<Compte />} />
      <Route path="/parfum/:id" element={<SavoirPlusParfum />} />
    </Routes>
  );
}
