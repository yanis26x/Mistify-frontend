import { useNavigate } from "react-router-dom";
import "./home.css";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";


export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="profilDiv">
        <Navbar
        user={user}
        onGoToAuth={() => navigate("/auth")}
        onGoToCommentaires={() => navigate("/Commentaire")}
        onChangeTheme={changeBackground}
        onGoToVendre={() => navigate("/vendreParfum")}
        nextBackground={backgrounds[(bgIndex + 1) % backgrounds.length]}
        onGoToCompte={() => navigate("/compte")}
        />
        <Footer/>
    </div>
  );
}
