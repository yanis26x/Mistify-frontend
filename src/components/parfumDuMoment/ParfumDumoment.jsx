import { useEffect, useState } from "react";
import "./ParfumDumoment.css";
import { useNavigate } from "react-router-dom";
import SellSection from "../sell/SellSection";

const BACKEND_URL = "http://localhost:3000";

export default function ParfumDumoment() {
  const [parfums, setParfums] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchParfums();
  }, []);

  async function fetchParfums() {
    try {
      const res = await fetch("http://localhost:3000/parfums");
      const data = await res.json();

      const lastParfums = data.slice().reverse();
      setParfums(lastParfums);
    } catch (error) {
      console.log("Erreur chargement parfums");
    }
  }

   function ajouterAuPanier() {
  let panier = JSON.parse(localStorage.getItem("panier")) || [];

  const deja = panier.find((item) => item.id === parfum.id);

  if (deja) {
    deja.quantite += 1;
  } else {
    panier.push({
      id: parfum.id,
      name: parfum.name,
      price: parfum.price,
      imageUrl: parfum.imageUrl,
      quantite: 1,
    });
  }

  localStorage.setItem("panier", JSON.stringify(panier));

  alert("Ajouté au panier !");
}

  function nextParfum() {
    if (parfums.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % parfums.length);
  }

  const parfum = parfums[currentIndex];

  return (
    <section className="momentSection">
        <h1 className="momentTitre">Mistify</h1>
        <p className="momentSousTitre">
          They didn't release you 'cause you're better, Daisy, they just gave up. You call this a life, hmm?
        </p>


      <div className="momentContent">
        {parfum && (
          <div className="momentCarte">
            <div className="momentNotif">Parfum du moment</div>

            <img
              src={parfum.imageUrl ? `${BACKEND_URL}${parfum.imageUrl}` : "/browser.png"}
              onError={(e) => (e.target.src = "/browser.png")}
              alt={parfum.name}
              className="momentImage"
              />

            <div className="momentInfos">
              <h2 className="momentParfumNom">{parfum.name}</h2>

              <p className="momentMarque">
                <strong >Marque :</strong> {parfum.brand}
              </p>

              <p className="momentDescription">
                <strong>Description :</strong>{" "}
                {parfum.description || "Aucune description"}
              </p>
{/* RATING A FAIRE !!!!!!!!!!!!! */}
              <p className="momentDescription"> 
                <strong>NOTE :</strong>{" "}
                0/5
              </p>

              <p className="momentPrix">
                {parfum.price ? `${parfum.price}$` : "Prix non précisé"}
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
                  Next ➜
                </button>

                
              </div>
            </div>
          </div>
        )}




        {/* STAT */}

        <div className="statsCard">
          <div className="statsNotif">want 2 know + about us?</div>

          <div className="statsList">
            <div className="statItem">
              <p className="statNom">Aicha-Rym Souane</p>
              <h3 className="statValeur">@rym31</h3>
            </div>

            <div className="statItem">
              <p className="statNom">Ellyn Saint-Firmin</p>
              <h3 className="statValeur">
                @el24s
              </h3>
            </div>

            <div className="statItem">
              <p className="statNom">Djenadi yanis</p>
              <h3 className="statValeur small">
                @yanis26x
              </h3>
            </div>


          </div>
        </div>
      </div>
      <SellSection parfums={parfums} />
    </section>
  );
}