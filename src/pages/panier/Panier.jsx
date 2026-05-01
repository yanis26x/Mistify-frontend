import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import "./Panier.css";

const BACKEND_URL = "http://localhost:3000";

export default function Panier() {
  const navigate = useNavigate();

  const [panier, setPanier] = useState([]);
  const [utilisateur, setUtilisateur] = useState(null);
  const [chargementUser, setChargementUser] = useState(true);

  const API_AUTH = "http://localhost:3000/auth/whoami";

  useEffect(() => {
    chargerPanier();
    verifierUtilisateur();
  }, []);

  function chargerPanier() {
    const data = JSON.parse(localStorage.getItem("panier")) || [];
    setPanier(data);
  }

  async function verifierUtilisateur() {
    try {
      const res = await axios.get(API_AUTH, {
        withCredentials: true,
      });
      setUtilisateur(res.data);
    } catch {
      setUtilisateur(null);
    } finally {
      setChargementUser(false);
    }
  }

  function sauvegarderPanier(nouveauPanier) {
    localStorage.setItem("panier", JSON.stringify(nouveauPanier));
    setPanier(nouveauPanier);
  }

  function ajouterQuantite(id) {
    const nouveauPanier = panier.map((parfum) => {
      if (parfum.id === id) {
        return { ...parfum, quantite: parfum.quantite + 1 };
      }
      return parfum;
    });

    sauvegarderPanier(nouveauPanier);
  }

  function enleverQuantite(id) {
    const nouveauPanier = panier
      .map((parfum) => {
        if (parfum.id === id) {
          return { ...parfum, quantite: parfum.quantite - 1 };
        }
        return parfum;
      })
      .filter((parfum) => parfum.quantite > 0);

    sauvegarderPanier(nouveauPanier);
  }

  function supprimerParfum(id) {
    const nouveauPanier = panier.filter((parfum) => parfum.id !== id);
    sauvegarderPanier(nouveauPanier);
  }

  function viderPanier() {
    localStorage.removeItem("panier");
    setPanier([]);
  }

  function validerPanier() {
    navigate("/payment");
  }

  const totalPanier = panier.reduce((total, parfum) => {
    return total + parfum.price * parfum.quantite;
  }, 0);

  if (chargementUser) {
    return <p style={{ color: "#ff4fa0", textAlign: "center" }}>Chargement...</p>;
  }

  if (!utilisateur) {
    return (
      <div className="pagePanier">
        <Navbar
          user={utilisateur}
          onChangeTheme={() => {}}
          onGoToVendre={() => navigate("/vendreParfum")}
          nextBackground="/bluePurpleBackground.jpg"
          onGoToCompte={() => navigate("/compte")}
        />

        <div className="pasConnecteBox">
          <h2>tes serieux....? Cree toi un compte dabord et revien -_-</h2>

          <button className="btnCompte" onClick={() => navigate("/compte")}>
            se connecter
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pagePanier">
      <Navbar
        user={utilisateur}
        onChangeTheme={() => {}}
        onGoToVendre={() => navigate("/vendreParfum")}
        nextBackground="/bluePurpleBackground.jpg"
        onGoToCompte={() => navigate("/compte")}
      />

      <div className="hautPanier">
        <h1 className="titrePanier">Panier𖤐</h1>
        <p className="sousTitrePanier">
          C'est tout c'que tu prend ?!! 
        </p>
      </div>

      {panier.length === 0 ? (
        <p className="panierVide">Ton panier est vide! remplie le !</p>
      ) : (
        <div className="layoutPanier">
          <div className="gauchePanier">
            <div className="ligneTitrePanier">
              <span>Détails du produit</span>
              <span>Quantité</span>
              <span>Prix</span>
              <span>Total</span>
            </div>

            <div className="listePanier">
              {panier.map((parfum) => (
                <div key={parfum.id} className="cartePanier">
                  <div className="colProduit">
                    <img
                      src={
                        parfum.imageUrl
                          ? `${BACKEND_URL}${parfum.imageUrl}`
                          : "/bloodd.png"
                      }
                      alt={parfum.name}
                      className="imagePanier"
                    />

                    <div className="infoProduit">
                      <h2 className="nomProduit">{parfum.name}</h2>
                      <p className="marqueProduit">{parfum.brand}</p>
                    </div>
                  </div>

                  <div className="colQuantite">
                    <button
                      className="btnQuantite"
                      onClick={() => enleverQuantite(parfum.id)}
                    >
                      -
                    </button>

                    <span className="boxQuantite">{parfum.quantite}</span>

                    <button
                      className="btnQuantite"
                      onClick={() => ajouterQuantite(parfum.id)}
                    >
                      +
                    </button>
                  </div>

                  <div className="colPrix">
                    <p>{parfum.price}$</p>
                  </div>

                  <div className="colTotal">
                    <p>{parfum.price * parfum.quantite}$</p>

                    <button
                      className="btnSupprimer"
                      onClick={() => supprimerParfum(parfum.id)}
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="droitePanier">
            <div className="carteResume">
              <h2 className="titreResume">Total</h2>

              <div className="ligneResume">
                <span>Sous-total</span>
                <span>{totalPanier}$</span>
              </div>

              <div className="ligneResume">
                <span>Livraison</span>
                <span>Gratuite</span>
              </div>

              <div className="petitTexteResume">Livraison standard</div>

              <button className="btnVider" onClick={viderPanier}>
                Vider le panier psq jai pas les moyens de sentire bon
              </button>

              <button className="btnValider" onClick={validerPanier}>
                Payer
              </button>

              <div className="paiementBox">
                <h3 className="paiementTitre">Nous acceptons</h3>

                {/* <div className="listePaiement">
                  <img src="/PayPal2.png" alt="PayPal" className="logoPaiement" />
                  <img src="/visa.png" alt="Visa" className="logoPaiement" />
                  <img src="/Mastercard.svg" alt="Mastercard" className="logoPaiement" />
                  <img
                    src="/american-express.png"
                    alt="American Express"
                    className="logoPaiement"
                  />
                  <img src="/apple-pay.png" alt="Apple Pay" className="logoPaiement" />
                </div> */}

                <div className="texteSangBox">
                  <img
                    src="/bloodd.png"
                    alt="sang"
                    className="fondSangPaiement"
                  />
                  <p className="texteSangPaiement">
                    nous acceptons egalement les payments par litres de sangs
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
