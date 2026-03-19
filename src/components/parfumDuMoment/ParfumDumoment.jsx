import { useEffect, useState } from "react";
import "./ParfumDumoment.css";

export default function ParfumDumoment() {
  const [parfums, setParfums] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

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
    <section className="heroSection">
      {parfum && (
        <div className="miniParfumCard">

          <div className="labelMoment">Parfum du moment !</div>

          <img
            src={parfum.imageUrl || "/bloodd.png"}
            onError={(e) => (e.target.src = "/bloodd.png")}
            alt={parfum.name}
            className="miniParfumImage"
          />

          <div className="miniParfumInfos">
            <h2 className="miniParfumName">{parfum.name}</h2>

            <p className="miniParfumBrand">
              <strong>Marque :</strong> {parfum.brand}
            </p>

            <p className="miniParfumDescription">
              <strong>Description :</strong>{" "}
              {parfum.description || "Aucune description"}
            </p>

            <p className="miniParfumPrice">
              {parfum.price ? `${parfum.price}$` : "Prix non précisé"}
            </p>

            <button className="miniBtn" onClick={nextParfum}>
              Découvrir un autre parfum
            </button>
          </div>
        </div>
      )}
    </section>
  );
}