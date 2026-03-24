import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ChercherParfum.css";

export default function ChercherParfum() {
  const [recherche, setRecherche] = useState("");
  const [parfums, setParfums] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  async function handleSearch() {
    setMessage("");

    try {
      const res = await axios.get("http://localhost:3000/parfums");

      const resultats = res.data.filter((parfum) =>
        parfum.name.toLowerCase().includes(recherche.toLowerCase())
      );

      setParfums(resultats);

      if (resultats.length === 0) {
        setMessage("Aucun parfum trouvé...");
      } else {
        setMessage(`${resultats.length} parfum trouvé!`);
      }
    } catch (error) {
      setMessage("Erreur lors de la recherche");
    }
  }

  return (
    <section className="chercherSection">
      <h2 className="chercherTitre">Chercher un parfum</h2>

      <div className="chercherBox">
        <input
          type="text"
          placeholder="Écris le nom du parfum..."
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
        />

        <button className="chercherBtn" onClick={handleSearch}>
          Chercher
        </button>
      </div>

      {message && <p className="chercherMessage">{message}</p>}

      <div className="chercherResultats">
        {parfums.map((parfum) => (
          <div key={parfum.id} className="parfumTrouve">
            <img
              src={parfum.imageUrl || "/bloodd.png"}
              alt={parfum.name}
              className="parfumImage"
              onError={(e) => (e.target.src = "/bloodd.png")}
            />

            <div className="parfumContenu">
              <p className="parfumNom">{parfum.name}</p>
              <p className="parfumMarque">{parfum.brand}</p>
              <p className="parfumPrix">
                {parfum.price ? `${parfum.price}$` : "Prix non précisé"}
              </p>

              <button
                className="savoirPlusBtn"
                onClick={() => navigate(`/parfum/${parfum.id}`)}
              >
                En savoir plus
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}