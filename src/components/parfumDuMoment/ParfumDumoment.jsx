import { useEffect, useState } from "react";
import "./ParfumDumoment.css";
import { useNavigate } from "react-router-dom";
import SellSection from "../sell/SellSection";

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

  function nextParfum() {
    if (parfums.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % parfums.length);
  }

  const parfum = parfums[currentIndex];

  return (
    <section className="momentSection">
      <div className="momentIntro">
        <h1 className="momentTitle">Mistify</h1>
        <p className="momentSubtitle">
        </p>
      </div>

      <div className="momentContent">
        {parfum && (
          <div className="momentCard">
            <div className="momentLabel">Parfum du moment</div>

            <img
              src={parfum.imageUrl || "/bloodd.png"}
              onError={(e) => (e.target.src = "/bloodd.png")}
              alt={parfum.name}
              className="momentImage"
            />

            <div className="momentInfos">
              <h2 className="momentParfumName">{parfum.name}</h2>

              <p className="momentBrand">
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

              <p className="momentPrice">
                {parfum.price ? `${parfum.price}$` : "Prix non précisé"}
              </p>

              <div className="momentButtons">
                <button className="momentBtn" onClick={nextParfum}>
                  Découvrir un autre parfum
                </button>

                <button
                  className="momentBtn secondary"
                  onClick={() => navigate(`/parfum/${parfum.id}`)}
                >
                  En savoir plus
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="statsCard">
          <div className="statsLabel">want 2 know + about us?</div>

          <div className="statsList">
            <div className="statItem">
              <p className="statName">Aicha-Rym Souane</p>
              <h3 className="statValue">@rym31</h3>
            </div>

            <div className="statItem">
              <p className="statName">Ellyn Saint-Firmin</p>
              <h3 className="statValue">
                @el24s
              </h3>
            </div>

            <div className="statItem">
              <p className="statName">Djenadi yanis</p>
              <h3 className="statValue small">
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