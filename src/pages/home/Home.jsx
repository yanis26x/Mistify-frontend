import { useNavigate } from "react-router-dom";
import "./home.css";
import { useState, useEffect } from "react";
import axios from "axios";
import ParfumDuMoment from "../../components/parfumDuMoment/ParfumDumoment";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { FiSun, FiWind } from "react-icons/fi";
import { LuFlower, LuTrees } from "react-icons/lu";
import { FaEarthAmericas } from "react-icons/fa6";
import { GiOakLeaf } from "react-icons/gi";


export default function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function checkUser() {
      try {
        const res = await axios.get("http://localhost:3000/users/whoami", {
          withCredentials: true,
        });
        setUser(res.data);
      } catch {
        setUser(null);
      }
    }
    checkUser();
  }, []);

  return (
    <div className="homeDiv">
      <Navbar
        user={user}
        onGoToAuth={() => navigate("/auth")}
        onGoToCommentaires={() => navigate("/Commentaire")}
        onGoToProfil={() => navigate("/profil", {state: {user}})}
        onGoToVendre={() => navigate("/vendreParfum")}
        onGoToCompte={() => navigate("/compte")}
      />

      <ParfumDuMoment />

      <div className="info-cards">
        <div className="info-card">
          <div className="info-icon"><LuFlower size={20} /></div>
          <p className="info-content">Floral</p>
        </div>
        <div className="info-card">
          <div className="info-icon"><FiSun size={20} /></div>
          <p className="info-content">Hespéridé</p>
        </div>
        <div className="info-card">
          <div className="info-icon"><FaEarthAmericas size={20} /></div>
          <p className="info-content">Oriental</p>
        </div>
        <div className="info-card">
          <div className="info-icon"><LuTrees size={20} /></div>
          <p className="info-content">Boisé</p>
        </div>
        <div className="info-card">
          <div className="info-icon"><GiOakLeaf size={20} /></div>
          <p className="info-content">Chypre</p>
        </div>
        <div className="info-card">
          <div className="info-icon"><FiWind size={20} /></div>
          <p className="info-content">Fougère</p>
        </div>
      </div>

      <div className="home-demandeParfum">
        <div className="home-demandeParfum-text">
          <h2 className="home-demandeParfum-title">Vous ne trouvez pas votre parfum ?</h2>
          <p className="home-demandeParfum-description">
            Faites-nous part de votre désir olfactif, et nous nous efforcerons de le trouver pour vous.
          </p>
        </div>
        <button className="home-demandeParfum-button" onClick={() => navigate("/ajout-parfum")}>
          Demander un parfum
        </button>
      </div>

      <Footer />
    </div>
  );
}
