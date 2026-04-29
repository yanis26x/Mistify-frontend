import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import VendreParfum from "./pages/vendre/VendreParfum";
import Compte from "./pages/account/Compte";
import DetailsParfum from "./pages/detailsParfum/DetailsParfum";
import Panier from "./pages/panier/Panier";
import Contact from "./pages/contact/Contact";
<<<<<<< HEAD
import Profil from "./pages/profil/Profil"
=======
>>>>>>> eb0346911ed266de13cfdede8d337301b0cd6afb

export default function App() {
  return (
    
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/vendreParfum" element={<VendreParfum />} />
      <Route path="/compte" element={<Compte />} />
      <Route path="/parfum/:id" element={<DetailsParfum />} />
      <Route path="/panier" element={<Panier />} />
<<<<<<< HEAD
      <Route path="/profil" element={<Profil />}/>
=======
>>>>>>> eb0346911ed266de13cfdede8d337301b0cd6afb
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}
