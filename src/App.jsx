import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import VendreParfum from "./pages/vendre/VendreParfum";
import Compte from "./pages/account/Compte";
import SavoirPlusParfum from "./pages/savoirPlusParfum/SavoirPlusParfum";
import Panier from "./pages/panier/Panier";
import Profil from "./pages/profil/Profil"

export default function App() {
  return (
    
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/vendreParfum" element={<VendreParfum />} />
      <Route path="/compte" element={<Compte />} />
      <Route path="/parfum/:id" element={<SavoirPlusParfum />} />
      <Route path="/panier" element={<Panier />} />
      <Route path="/profil" element={<Profil />}/>
    </Routes>
  );
}
