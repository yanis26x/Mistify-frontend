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
import { Link } from "react-router-dom";
import { FiUser, FiHeart, FiShoppingCart } from "react-icons/fi";
import NavbarRecherche from "../navbarRecherche/NavbarRecherche";

export default function Navbar({
  user,
  onGoToCompte,
}) {
  const photoProfil = user?.admin ? "/vampp.jpeg" : "/Hello-kitty.webp";

  return (
    <header className="navbarMistify">
      <Link to="/" className="logo">
        <img src="/SpotifyLogoRed.webp" alt="" className="logoImage" />
        Mistify
      </Link>

      <NavbarRecherche />

      <div className="navbarDroiteActuelle">
        <nav className="nav-links">
          <Link to="/parfums" className="nav-link">PARFUMS</Link>
          <Link to="/contact" className="nav-link">CONTACT</Link>
        </nav>

        <div className="nav-icons">
          <Link to="/favoris" className="icon-button" title="Favoris">
            <FiHeart />
          </Link>

          <Link to="/panier" className="icon-button" title="Panier">
            <FiShoppingCart />
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
