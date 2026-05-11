import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
// import VendreParfum from "./pages/vendre/VendreParfum";
import Compte from "./pages/account/Compte";
import DetailsParfum from "./pages/detailsParfum/DetailsParfum";
import Panier from "./pages/panier/Panier";
import Payment from "./pages/payment/Payment";
import Contact from "./pages/contact/contact";
import Profil from "./pages/profil/Profil"
import AjoutParfum  from "./pages/AjoutParfum/AjoutParfum";
import Parfums from "./pages/parfums/Parfums";
import DemandeAdmin from "./pages/demandeAdmin/DemandeAdmin";
import BoiteVocale from "./pages/boiteVocale/BoiteVocale";
import Favoris from "./pages/favoris/Favoris";

export default function App() {
  return (
    
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/vendreParfum" element={<VendreParfum />} /> */}
      <Route path="/compte" element={<Compte />} />
      <Route path="/parfum/:id" element={<DetailsParfum />} />
      <Route path="/ajout-parfum/" element={<AjoutParfum />} />
      <Route path="/demande-admin" element={<DemandeAdmin />} />
      <Route path="/boite-vocale" element={<BoiteVocale />} />
      <Route path="/favoris" element={<Favoris />} />
      <Route path="/parfums/" element={<Parfums />} />
      <Route path="/panier" element={<Panier />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/paiement" element={<Payment />} />
      <Route path="/payement" element={<Payment />} />
      <Route path="/profil" element={<Profil />}/>
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}
