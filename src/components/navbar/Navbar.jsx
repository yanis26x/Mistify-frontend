import "./Navbar.css";
import UserStatus from "../userStatus/UserStatus";
import { useNavigate } from "react-router-dom"; 
export default function Navbar({
  user,
  onChangeTheme,
  onGoToVendre,
  nextBackground,
  onGoToCompte,
}) {
  const navigate = useNavigate(); 

  return (
    <nav className="navbarMistify">
      <div className="navbarGauche">
        <UserStatus user={user} onGoToCompte={onGoToCompte} />
      </div>

      <div className="navbarDroite">
        <button
          className="navBtn navThemeBtn"
          onClick={onChangeTheme}
          style={{
            backgroundImage: `url(${nextBackground})`,
          }}
        >
          Theme
        </button>
        
         <button
          className="profilBtn"
          onClick={() => navigate("/profil")}
        >
          <span> Profil </span>

          
        </button>
        <button className="navBtn" onClick={onGoToVendre}>
          <span>Vendre</span>
        </button>

        <button
          className="panierBtn"
          onClick={() => navigate("/panier")}
        >
          <img src="/bloody_bands.webp" alt="Panier" />
          <span className="panierText">Panier</span>
        </button>
      </div>
    </nav>
  );
}