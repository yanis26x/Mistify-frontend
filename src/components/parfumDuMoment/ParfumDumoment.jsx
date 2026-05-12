import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SellSection from "../sell/SellSection";
import { getImageUrl } from "../../utils/imageUrl";
import "./ParfumDumoment.css";

const BACKEND_URL = "";

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
      <h1 className="momentTitre">Mistify</h1>

      <div className="momentContent">
        {parfum && (
          <div className="momentCarte">
            <div className="momentNotif">Dernier parfum</div>

            <img
              src={getImageUrl(parfum.imageUrl, BACKEND_URL)}
              onError={(e) => (e.target.src = "/flacon-parfum.png")}
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
              {parfum.famille?.name && (
                <p className="momentDescription">
                  <strong>Famille :</strong> {parfum.famille.name}
                </p>
              )}


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
          <div className="statsNotif">L'équipe Mistify</div>

          <div className="statsList">
            <div className="statItem">
              <p className="statNom">Aicha-Rym Souane</p>
              <h3 className="statValeur">@rym31</h3>
            </div>

            <div className="statItem">
              <p className="statNom">Ellyn Saint-Firmin</p>
              <h3 className="statValeur">@el24s</h3>
            </div>

            <div className="statItem">
              <p className="statNom">Djenadi yanis</p>
              <h3 className="statValeur small">@yanis26x</h3>
            </div>
          </div>
        </div>
      </div>
      <SellSection parfums={parfums} />
    </section>
  );
}
