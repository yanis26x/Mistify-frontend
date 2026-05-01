import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import VendreParfum from "./pages/vendre/VendreParfum";
import Compte from "./pages/account/Compte";
import DetailsParfum from "./pages/detailsParfum/DetailsParfum";
import Panier from "./pages/panier/Panier";
import Payment from "./pages/payment/Payment";
import Contact from "./pages/contact/Contact";
import Profil from "./pages/profil/Profil"

export default function App() {
  return (
    
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/vendreParfum" element={<VendreParfum />} />
      <Route path="/compte" element={<Compte />} />
      <Route path="/parfum/:id" element={<DetailsParfum />} />
      <Route path="/panier" element={<Panier />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/paiement" element={<Payment />} />
      <Route path="/payement" element={<Payment />} />
      <Route path="/profil" element={<Profil />}/>
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}
