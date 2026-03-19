import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./SavoirPlusParfum.css";
import { useNavigate } from "react-router-dom";

export default function SavoirPlusParfum() {
  const { id } = useParams();
const navigate = useNavigate();
  const [parfum, setParfum] = useState(null);


  useEffect(() => {
    fetchParfum();
  }, []);
  console.log("ID:", id);

  async function fetchParfum() {
    try {
      const res = await fetch(`http://localhost:3000/parfums/${id}`);
      const data = await res.json();
      setParfum(data);
    } catch (err) {
      console.log("Erreur parfum");
    }
  }

 

  if (!parfum) return <p style={{ color: "white" }}>Chargement...</p>;

  return (
    <div className="parfumPage">

              <button className="back-btn" onClick={() => navigate("/")}>
        ← Retour au menu
      </button>

      <div className="parfumContainer">

        {/* IMAGE */}
        <div className="parfumLeft">
          <img
            src={parfum.imageUrl || "/bloodd.png"}
            onError={(e) => (e.target.src = "/bloodd.png")}
            className="parfumImage"
          />
        </div>

        {/* INFOS */}
        <div className="parfumRight">
          <h1 className="parfumTitle">{parfum.name}</h1>

          <p className="parfumBrand">{parfum.brand}</p>

          <p className="parfumDesc">
            {parfum.description || "Aucune description disponible."}
          </p>

          <p className="parfumPrice">
            {parfum.price ? `${parfum.price}$` : "Prix non précisé"}
          </p>
        </div>

      </div>


    </div>
  );
}