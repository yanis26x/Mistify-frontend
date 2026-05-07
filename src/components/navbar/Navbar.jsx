// import "./Navbar.css";
// import UserStatus from "../userStatus/UserStatus";
// import { useNavigate } from "react-router-dom"; 
// export default function Navbar({
//   user,
//   onChangeTheme,
//   onGoToVendre,
//   nextBackground,
//   onGoToCompte,
// }) {
//   const navigate = useNavigate(); 

//   return (
//     <nav className="navbarMistify">
//       <div className="navbarGauche">
//         <UserStatus user={user} onGoToCompte={onGoToCompte} />
//       </div>

//       <div className="navbarDroite">
//         <button
//           className="navBtn navThemeBtn"
//           onClick={onChangeTheme}
//           style={{
//             backgroundImage: `url(${nextBackground})`,
//           }}
//         >
//           theme
//         </button>

//         <button className="navBtn" onClick={onGoToVendre}>
//           <span>Vendre</span>
//         </button>

//         <button
//           className="panierBtn"
//           onClick={() => navigate("/panier")}
//         >
//           <img src="/bloody_bands.webp" alt="Panier" />
//           <span className="panierText">Panier</span>
//         </button>
//       </div>
//     </nav>
//   );
// }

import "./Navbar.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FiUser, FiHeart, FiShoppingCart } from "react-icons/fi";
import NavbarRecherche from "../navbarRecherche/NavbarRecherche";

const API_URL = "http://localhost:3000";

export default function Navbar({
  user,
  onGoToCompte,
}) {
  const photoProfil = user?.admin ? "/vampp.jpeg" : "/Hello-kitty.webp";
  const [nombrePanier, setNombrePanier] = useState(0);

  useEffect(() => {
    async function chargerNombrePanier() {
      if (!user) {
        setNombrePanier(0);
        return;
      }

      try {
        const res = await axios.get(`${API_URL}/panier`, {
          withCredentials: true,
        });
        const panier = Array.isArray(res.data) ? res.data : [];
        const total = panier.reduce((somme, parfum) => {
          return somme + Number(parfum.quantite || 0);
        }, 0);
        setNombrePanier(total);
      } catch {
        setNombrePanier(0);
      }
    }

    chargerNombrePanier();
    window.addEventListener("panier-change", chargerNombrePanier);

    return () => {
      window.removeEventListener("panier-change", chargerNombrePanier);
    };
  }, [user]);

  return (
    <header className="navbarMistify">
      <Link to="/" className="logo">
        <img src="/SpotifyLogoRed.webp" alt="" className="logoImage" />
        Mistify
      </Link>

      <nav className="nav-links">
        <Link to="/" className="nav-link">ACCUEIL</Link>
        <Link to="/parfums" className="nav-link">PARFUMS</Link>
        <Link to="/contact" className="nav-link">CONTACT</Link>
      </nav>
      <NavbarRecherche />

      <div className="navbarDroiteActuelle">
        <nav className="nav-links">
          <Link to="/ajout-parfum" className="nav-link"> DEMANDE PARFUM </Link>
          <Link to="/contact" className="nav-link">CONTACT</Link>
        </nav>

        <div className="nav-icons">
          <Link to="/favoris" className="icon-button" title="Favoris">
            <FiHeart />
          </Link>

          <Link to="/panier" className="icon-button panier-icon" title="Panier">
            <FiShoppingCart />
            {nombrePanier > 0 && (
              <span className="notifPanier">{nombrePanier}</span>
            )}
          </Link>

          <Link
            to="/compte"
            className={`icon-button ${user ? "profil-button" : ""}`}
            title="Compte"
            onClick={onGoToCompte}
          >
            {user ? (
              <img src={photoProfil} alt="Compte" className="photoProfilNavbar" />
            ) : (
              <FiUser />
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
