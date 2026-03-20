import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./SavoirPlusParfum.css";

export default function SavoirPlusParfum() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [parfum, setParfum] = useState(null);

  useEffect(() => {
    fetchParfum();
  }, [id]);

  async function fetchParfum() {
    try {
      const res = await fetch(`http://localhost:3000/parfums/${id}`);
      const data = await res.json();
      setParfum(data);
    } catch (err) {
      console.log("Erreur parfum");
    }
  }

  if (!parfum) {
    return (
      <div className="parfumPage">
        <button className="back-btn" onClick={() => navigate("/")}>
          ← Retour au menu
        </button>

        <div className="loadingBox">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="parfumPage">
      <button className="back-btn" onClick={() => navigate("/")}>
        ← Retour au menu
      </button>

      <div className="parfumContainer">
        <div className="parfumCard">
          <img
            src={parfum.imageUrl || "/bloodd.png"}
            onError={(e) => (e.target.src = "/bloodd.png")}
            alt={parfum.name}
            className="parfumImage"
          />

          <div className="parfumInfos">
       

            <h1 className="parfumTitle">{parfum.name}</h1>

            <p className="parfumBrand">{parfum.brand}</p>

            <p className="parfumDesc">
              {parfum.description || "Aucune description disponible."}
            </p>

            <p className="parfumPrice">
              {parfum.price ? `${parfum.price}$` : "Prix non précisé"}
            </p>

            <div className="parfumMeta">
              <div className="metaBox">
                <span className="metaLabel">ID</span>
                <span className="metaValue">{parfum.id}</span>
              </div>

              <div className="metaBox">
                <span className="metaLabel">Marque</span>
                <span className="metaValue">{parfum.brand}</span>
              </div>


              <div className="metaBox">
                <span className="metaLabel">note</span>
                <span className="metaValue">A FAIRE</span>
              </div>



              <div className="metaBox">
                <span className="metaLabel"> btn ajouter dans le panier</span>
                <span className="metaValue">A FAIRE</span>
              </div>




              <div className="metaBox">
                <span className="metaLabel">nombre davis</span>
                <span className="metaValue">A FAIRE</span>
              </div>


              <div className="metaBox">
                <span className="metaLabel">buy now!</span>
                <span className="metaValue">A FAIRE</span>
              </div>


              <h1> section commentaire A FAIRE</h1>
              <h2>INPUt ajouter commentaire A FAIRE</h2>




      



            </div>
          </div>
        </div>
      </div>
    </div>
  );
}