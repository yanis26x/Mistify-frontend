import { useNavigate } from "react-router-dom";
import "./home.css";
import { useState, useEffect } from "react";
import axios from "axios";
import ChercherParfum from "../../components/chercherParfum/ChercherParfum";
import ParfumDumoment from "../../components/parfumDuMoment/ParfumDumoment";
import Navbar from "../../components/navbar/Navbar";
import Bienvenue from "../../components/salut/Bienvenue";
import Stat from "../../components/stat/Stat";

export default function Home() {
  const navigate = useNavigate();

  const backgrounds = [
    "/girl-interrupted.jpg",
    "/frutigerBG.jpg",
    "/sillentHill.jpg",
    "/rymApasDESwag.webp",
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
        onGoToVendre={() => navigate("/vendreParfum")}
        nextBackground={backgrounds[(bgIndex + 1) % backgrounds.length]}
        onGoToCompte={() => navigate("/compte")}
      />

      <Bienvenue />

        <ParfumDumoment />
        


      <ChercherParfum />

      <section className="vendreSection">
        <h2 className="titreVendre">Vende/ajoute des parfums sur Mistify !</h2>
        <p className="texteVendre">
          Vous avez un parfum que vous n’utilisez plus!? (ou vous manquez
          vraiment d'argent...) Sur Mistify, vous pouvez facilement vendre vos
          parfums et les partager avec d'autres passionnés!
        </p>
        <button className="BTNvendre" onClick={() => navigate("/vendreParfum")}>
          Vendre un parfum
        </button>
      </section>

      <Stat />
    </div>
  );
}
