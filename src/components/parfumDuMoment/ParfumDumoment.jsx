import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MessagePerso from "../MsgPerso/MessagePerso";
import { getImageUrl } from "../../utils/imageUrl";
import "./ParfumDumoment.css";

const BACKEND_URL = "http://localhost:3000";

const createurs = [
  {
    nom: "Aicha-Rym Souane",
    pseudo: "@rym31",
    lien: "https://github.com/rym31",
  },
  {
    nom: "Ellyn Saint-Firmin",
    pseudo: "@el24s",
    lien: "https://github.com/el24s",
  },
  {
    nom: "Djenadi yanis",
    pseudo: "@yanis26x",
    lien: "https://yanis26x.github.io/yanis26x/",
  },
];

export default function ParfumDuMoment() {
  const [parfums, setParfums] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchParfums() {
      try {
        const res = await fetch("http://localhost:3000/parfums");
        const data = await res.json();

        const lastParfums = data.slice().reverse();
        setParfums(lastParfums);
      } catch {
        console.log("Erreur chargement parfums");
      }
    }

    fetchParfums();
  }, []);

  async function ajouterAuPanier() {
    if (!parfum) return;

    try {
      await axios.post(
        `${BACKEND_URL}/panier`,
        { parfumId: parfum.id, quantite: 1 },
        { withCredentials: true }
      );
      window.dispatchEvent(new Event("panier-change"));
      alert("Ajouté au panier !");
    } catch {
      alert("Connecte-toi pour ajouter au panier.");
      navigate("/compte");
    }
  }

  function nextParfum() {
    if (parfums.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % parfums.length);
  }

  const parfum = parfums[currentIndex];

  return (
    <section className="momentSection">
      <div className="momentContent">
        {parfum && (
          <div className="momentCarte">
            <div className="momentNotif">Dernier parfum ajouté</div>

            <img
              src={getImageUrl(parfum.imageUrl, BACKEND_URL)}
              onError={(e) => (e.target.src = "/bloodd.png")}
              alt={parfum.name}
              className="momentImage"
            />

            <div className="momentInfos">
              <h2 className="momentParfumNom">{parfum.name}</h2>

              <p className="momentMarque">
                <strong>Marque :</strong> {parfum.brand}
              </p>

              <p className="momentDescription">
                <strong>Description :</strong>{" "}
                {parfum.description || "Aucune description"}
              </p>
              <p className="momentDescription">
    
              </p>


              <div className="momentAutreParfum">
                <button className="momentBtn avantSecondary" onClick={ajouterAuPanier}>
                  Ajouter au panier
                </button>

                <button
                  className="momentBtn secondary"
                  onClick={() => navigate(`/parfum/${parfum.id}`)}
                >
                  En savoir plus
                </button>
                <button className="momentBtn" onClick={nextParfum}>
                  Suivant
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="statsCard">
          <div className="statsNotif">want 2 know + about us?</div>

          <div className="statsList">
            {createurs.map((createur) => (
              <a
                key={createur.pseudo}
                className="statItem"
                href={createur.lien}
                target="_blank"
                rel="noreferrer"
              >
                <p className="statNom">{createur.nom}</p>
                <h3 className="statValeur">{createur.pseudo}</h3>
              </a>
            ))}
          </div>
        </div>
      </div>
      <MessagePerso />
    </section>
  );
}
