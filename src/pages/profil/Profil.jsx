import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";


export default function Profil() {
  const navigate = useNavigate();

  return (
    <div className="profilDiv">
      <h2 className="titre"> Page profil de </h2>
      <Navbar
        user={user}
        onGoToAuth={() => navigate("/auth")}
        onGoToProfil={() => navigate("/profil")}
        onGoToCommentaires={() => navigate("/commentaire")}
        onChangeTheme={changeBackground}
        onGoToVendre={() => navigate("/vendreParfum")}
        nextBackground={backgrounds[(bgIndex + 1) % backgrounds.length]}
        onGoToCompte={() => navigate("/compte")}
      />
      
      <h3> Prénom: </h3>
      <h3> Nom: </h3>
      <h3> Date d'anniversaire: </h3>
      <h3> Commande effectuée: </h3>
      <h3> Demande de parfums: </h3>
      <h3> Commentaires: </h3>
      <h3> Notes: </h3>
      <h3> Signalement: </h3>

        
        <Footer/>
    </div>
  );
}
