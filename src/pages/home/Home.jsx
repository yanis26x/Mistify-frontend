import { useNavigate } from "react-router-dom";
import "./home.css";
import { useState, useEffect } from "react";
import axios from "axios";
import ChercherParfum from "../../components/chercherParfum/ChercherParfum";
import ParfumDuMoment from "../../components/parfumDuMoment/ParfumDumoment";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { FiCloud} from "react-icons/fi";
import { LuFlower } from "react-icons/lu";
import { FaWind } from "react-icons/fa";
import { FaEarthAmericas } from "react-icons/fa6";
import { LuTrees } from "react-icons/lu";
import { IoIosIceCream } from "react-icons/io";


export default function Home() {
  const navigate = useNavigate();

  const backgrounds = [
    "/coolBlue.jpeg",
    "/frutiger/materialdictionary178_129.jpg",
    "/frutiger/materialdictionary178_130.jpg",
    "/frutiger/materialdictionary206_10.jpg",
  ];

  const [bgIndex, setBgIndex] = useState(0);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function checkUser() {
      try {
        const res = await axios.get("http://localhost:3000/auth/whoami", {
          withCredentials: true,
        });
        setUser(res.data);
      } catch (error) {
        setUser(null);
      }
    }

    checkUser();
  }, []);

  function changeBackground() {
    setBgIndex((prev) => (prev + 1) % backgrounds.length);
  }

  return (
    <div
      className="homeDiv"
      style={{ backgroundImage: `url(${backgrounds[bgIndex]})` }}
    >
      <Navbar
        user={user}
        onGoToAuth={() => navigate("/auth")}
        onGoToCommentaires={() => navigate("/Commentaire")}
        onChangeTheme={changeBackground}
        // best way i think would be with context
        onGoToProfil={() => navigate("/profil", {state: {user}})}
        onGoToVendre={() => navigate("/vendreParfum")}
        nextBackground={backgrounds[(bgIndex + 1) % backgrounds.length]}
        onGoToCompte={() => navigate("/compte")}
      />


      <ParfumDuMoment />



      <ChercherParfum />



      <div className="info-cards">
        <div className="info-card">
          <div className="info-icon">
            <LuFlower size={20} />
          </div>
          <p className="info-content">Floral</p>
        </div>

        <div className="info-card">
          <div className="info-icon">
            <FaWind size={20} />
          </div>
          <p className="info-content">Frais</p>
        </div>

        <div className="info-card">
          <div className="info-icon">
            <FaEarthAmericas size={20} />
          </div>
          <p className="info-content">Oriental</p>
        </div>

        <div className="info-card">
          <div className="info-icon">
            <LuTrees size={20} />
          </div>
          <p className="info-content">Boisé</p>
        </div>

        <div className="info-card">
          <div className="info-icon">
            <IoIosIceCream size={20} />
          </div>
          <p className="info-content">Gourmand</p>
        </div>

        <div className="info-card">
          <div className="info-icon">
            <FiCloud size={20} />
          </div>
          <p className="info-content">Musk</p>
        </div>


      </div>






<div className="home-demandeParfum">

  <div className="home-demandeParfum-text">
    <h2 className="home-demandeParfum-title">Vous ne trouvez pas votre parfum ?</h2>
    <p className="home-demandeParfum-description">
      Faites-nous part de votre désir olfactif, et nous nous efforcerons de le trouver pour vous.
    </p>
  </div>


  <button className="home-demandeParfum-button" onClick={() => navigate("/demandeAjoutParfum")}>
    Demander un parfum
  </button>
</div>


      <Footer />


    </div>
  );
}
