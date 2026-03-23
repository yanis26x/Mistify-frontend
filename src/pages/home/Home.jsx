import { useNavigate } from "react-router-dom";
import "./home.css";
import { useState, useEffect } from "react";
import axios from "axios";
import ChercherParfum from "../../components/chercherParfum/ChercherParfum";
import ParfumDumoment from "../../components/parfumDuMoment/ParfumDumoment";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";


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
        onGoToVendre={() => navigate("/vendreParfum")}
        nextBackground={backgrounds[(bgIndex + 1) % backgrounds.length]}
        onGoToCompte={() => navigate("/compte")}
      />


        <ParfumDumoment />
        


      <ChercherParfum />

      
      <Footer/>


    </div>
  );
}
