import { useNavigate } from "react-router-dom";
import "./home.css";
import { useState, useEffect } from "react";
import axios from "axios";
import UserStatus from "../components/userStatus/UserStatus";
import ChercherParfum from "../components/chercherParfum/ChercherParfum";
import ParfumDumoment from "../components/parfumDuMoment/ParfumDumoment";

export default function Home() {
  const navigate = useNavigate();

  const backgrounds = [
    "/girl-interrupted.jpg",
    "/idkok.jpeg",
    "/idk2.jpeg",
    "/SpotifyLogoRed.webp",
    "/frutigerBG.jpg",
"/sillentHill.jpg",

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
      <UserStatus user={user} onGoToAuth={() => navigate("/auth")} />

      <button className="BTNcommentaireTop" onClick={() => navigate("/Commentaire")}>
        <span>Commentaires</span>
      </button>

      <button
        className="BTNchangeBg"
        onClick={changeBackground}
        style={{
          backgroundImage: `url(${backgrounds[(bgIndex + 1) % backgrounds.length]})`
        }}
      >
        theme
      </button>

      <button className="BTNvendreTop" onClick={() => navigate("/vendreParfum")}>
        <span>Vendre</span>
      </button>

      <button className="BTNcompte" onClick={() => navigate("/auth")}>
        <span>Compte</span>
      </button>


      <section className="heroSection">
        <h1 className="titreHome">Bienvenue sur Mistify</h1>
        <p className="soustitreHome">
ok....?
        </p>
      </section>

{/* <ParfumDumoment/> */}
      

      <ChercherParfum/>

      <section className="vendreSection">
        <h2 className="titreVendre">Vende/ajoute des parfums sur Mistify !</h2>
        <p className="texteVendre">
          Vous avez un parfum que vous n’utilisez plus!? (ou vous manquez vraiment d'argent...)
          Sur Mistify, vous pouvez facilement vendre vos parfums et les partager avec d'autres passionnés!
        </p>
        <button
          className="BTNvendre"
          onClick={() => navigate("/vendreParfum")}
        >
          Vendre un parfum
        </button>
      </section>

      <ParfumDumoment/>
    </div>
  );
}