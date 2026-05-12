import { useNavigate } from "react-router-dom";
import "./home.css";
import { useState, useEffect } from "react";
import axios from "axios";
import ParfumDuMoment from "../../components/parfumDuMoment/ParfumDumoment";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import FauxCommentaires from "../../components/fauxCommentaires/FauxCommentaires";


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

  // function changeBackground() {
  //   setBgIndex((prev) => (prev + 1) % backgrounds.length);
  // }

  return (
    <div
      className="homeDiv"
      // style={{ backgroundImage: `url(${backgrounds[bgIndex]})` }}
    >
      <Navbar
        user={user}
        onGoToCompte={() => navigate("/compte")}
      />


      <ParfumDuMoment />

      <h2 className="titrePkConfiance">𖤐POURQUOI NOUS FAIRE CONFIANCE ?!</h2>

      <div className="info-cards">
        <div className="info-card">
          <p className="info-content">On est super lent</p>
        </div>

        <div className="info-card">
          <p className="info-content">On charge beaucoup plus que nos concurrents</p>
        </div>

        <div className="info-card">
          <p className="info-content">On a aucun savoir-faire</p>
        </div>

        <div className="info-card">
          <p className="info-content">100% de clients decus par leur commande</p>
        </div>

        <div className="info-card">
          <p className="info-content">Nos parfums sont vraiment pas de bonne qualité</p>
        </div>
      </div>

      <FauxCommentaires />






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
