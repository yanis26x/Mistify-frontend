import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import DialoguePersona from "../../components/dialoguePersona/DialoguePersona";
import "./Panier.css";
import { getImageUrl } from "../../utils/imageUrl";
import { FaCcVisa, FaCcMastercard, FaCcAmex, FaCcPaypal, FaApplePay } from "react-icons/fa";



const BACKEND_URL = "http://localhost:3000";
const LIVRAISON = 96;

export default function Panier() {
  const navigate = useNavigate();

  const [panier, setPanier] = useState([]);
  const [utilisateur, setUtilisateur] = useState(null);
  const [chargementUser, setChargementUser] = useState(true);

  const API_AUTH = "http://localhost:3000/users/whoami";

  useEffect(() => {
    verifierUtilisateur();
  }, []);

  async function verifierUtilisateur() {
    try {
      const res = await axios.get(API_AUTH, {
        withCredentials: true,
      });
      setUtilisateur(res.data);

      const reponsePanier = await axios.get(`${BACKEND_URL}/panier`, {
        withCredentials: true,
      });
      setPanier(Array.isArray(reponsePanier.data) ? reponsePanier.data : []);
    } catch {
      setUtilisateur(null);
      setPanier([]);
    } finally {
      setChargementUser(false);
    }
  }

  async function ajouterQuantite(id) {
    const parfum = panier.find((item) => item.id === id);
    if (!parfum) return;

    const res = await axios.patch(
      `${BACKEND_URL}/panier/${id}`,
      { quantite: parfum.quantite + 1 },
      { withCredentials: true }
    );
    setPanier(Array.isArray(res.data) ? res.data : []);
    window.dispatchEvent(new Event("panier-change"));
  }

  async function enleverQuantite(id) {
    const parfum = panier.find((item) => item.id === id);
    if (!parfum) return;

    const res = await axios.patch(
      `${BACKEND_URL}/panier/${id}`,
      { quantite: parfum.quantite - 1 },
      { withCredentials: true }
    );
    setPanier(Array.isArray(res.data) ? res.data : []);
    window.dispatchEvent(new Event("panier-change"));
  }

  async function supprimerParfum(id) {
    const res = await axios.delete(`${BACKEND_URL}/panier/${id}`, {
      withCredentials: true,
    });
    setPanier(Array.isArray(res.data) ? res.data : []);
    window.dispatchEvent(new Event("panier-change"));
  }

  async function viderPanier() {
    const res = await axios.delete(`${BACKEND_URL}/panier`, {
      withCredentials: true,
    });
    setPanier(Array.isArray(res.data) ? res.data : []);
    window.dispatchEvent(new Event("panier-change"));
  }

  function validerPanier() {
    navigate("/payment");
  }

  const sousTotal = panier.reduce((total, parfum) => {
    return total + parfum.price * parfum.quantite;
  }, 0);
  const totalPanier = sousTotal + LIVRAISON;

  if (chargementUser) {
    return <p style={{ color: "#ff4fa0", textAlign: "center" }}>Chargement...</p>;
  }

  if (!utilisateur) {
    return (
      <div className="pagePanier">
        <Navbar
          user={utilisateur}
          onGoToCompte={() => navigate("/compte")}
        />
        <DialoguePersona
          nom="@yanis26x"
          texte="Connecte-toi d’abord..."
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
        onGoToCompte={() => navigate("/compte")}
      />
      <DialoguePersona
        nom="@yanis26x"
        texte="C'est tout c'que tu prend.....?!!"
      />

      <div className="hautPanier">
        <h1 className="titrePanier">Panier𖤐</h1>
        <p className="sousTitrePanier">
          Sephora, c’est sûrement moins cher et + fiable... j’dis ça, j’dis rien.
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
                      src={getImageUrl(parfum.imageUrl, BACKEND_URL)}
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
                <span>{sousTotal}$</span>
              </div>

              <div className="ligneResume">
                <span>Livraison</span>
                <span>{LIVRAISON}$</span>
              </div>

              <div className="petitTexteResume">Livraison standard (7 à 10 mois)</div>

              <div className="ligneResume totalResume">
                <span>Total</span>
                <span>{totalPanier}$</span>
              </div>

              <button className="btnVider" onClick={viderPanier}>
                Vider tout le panier parce que t’as pas d’argent sale lâche
              </button>

              <button className="btnValider" onClick={validerPanier}>
                Payer
              </button>

              <div className="paiementBox">
                <h3 className="paiementTitre">Nous acceptons</h3>




                <div className="listePaiement">
  <FaCcPaypal className="logoPaiement" />
  <FaCcVisa className="logoPaiement" />
  <FaCcMastercard className="logoPaiement" />
  <FaCcAmex className="logoPaiement" />
  <FaApplePay className="logoPaiement" />
</div>

                <div className="texteSangBox">
                  
                  <p className="texteSangPaiement">
                    aucun remboursement ne sera effectuer, garde la peche
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
