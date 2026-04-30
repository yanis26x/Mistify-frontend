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
import { FiSearch, FiUser, FiHeart, FiShoppingCart } from "react-icons/fi";

export default function Navbar({
  user,
  onGoToCompte,}) {

  return (
    <header className="navbarMistify">
      <Link to="/" className="logo">
        Mistify
      </Link>

      <nav className="nav-links">
        <Link to="/" className="nav-link">ACCUEIL</Link>
        <Link to="/parfums" className="nav-link">PARFUMS</Link>
        <Link to="/ajout-parfum" className="nav-link"> DEMANDE PARFUM </Link>
        <Link to="/contact" className="nav-link">CONTACT</Link>
      </nav>

      <div className="nav-icons">
        <Link to="/recherche" className="icon-button" title="Rechercher">
          <FiSearch />
        </Link>

        <Link to="/compte" className="icon-button" title="Compte" onClick={onGoToCompte}>
          <FiUser />
        </Link>

        <Link to="/favoris" className="icon-button" title="Favoris">
          <FiHeart />
        </Link>

        <Link to="/panier" className="icon-button" title="Panier">
          <FiShoppingCart />
        </Link>
      </div>
    </header>
  );
}
