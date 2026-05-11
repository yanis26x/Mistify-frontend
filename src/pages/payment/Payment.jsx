import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Payment.css";

const API_URL = "http://localhost:3000";
const LIVRAISON = 96;

export default function Payment() {
  const navigate = useNavigate();
  const [commandeValidee, setCommandeValidee] = useState(false);
  const [messageErreur, setMessageErreur] = useState("");
  const [panier, setPanier] = useState([]);
  const [chargement, setChargement] = useState(true);

  useEffect(() => {
    async function chargerPanier() {
      try {
        const res = await axios.get(`${API_URL}/panier`, {
          withCredentials: true,
        });
        setPanier(Array.isArray(res.data) ? res.data : []);
      } catch {
        setMessageErreur("Connecte-toi avant de payer.");
        setPanier([]);
      } finally {
        setChargement(false);
      }
    }

    chargerPanier();
  }, []);

  const sousTotal = panier.reduce((total, parfum) => {
    return total + Number(parfum.price || 0) * Number(parfum.quantite || 0);
  }, 0);
  const totalPanier = sousTotal + LIVRAISON;

  async function handleSubmit(e) {
    e.preventDefault();
    setMessageErreur("");

    if (panier.length === 0) {
      setMessageErreur("Ton panier est vide.");
      return;
    }

    const form = e.currentTarget;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    try {
      await axios.delete(`${API_URL}/panier`, {
        withCredentials: true,
      });
      setPanier([]);
      window.dispatchEvent(new Event("panier-change"));
      setCommandeValidee(true);
    } catch {
      setMessageErreur("Impossible de vider le panier apres le paiement.");
    }
  }

  if (chargement) {
    return (
      <div className="pagePaiement">
        <div className="boitePaiement">Chargement...</div>
      </div>
    );
  }

  if (commandeValidee) {
    return (
      <div className="pagePaiement">
        <div className="boitePaiement confirmationPaiement">
          <h1>Commande confirmee</h1>
          <p>Ton paiement est passe. Un recu va etre envoye par email.</p>

          <button className="boutonPayer" onClick={() => navigate("/")}>
            Retour a l'accueil
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pagePaiement">
      <form className="boitePaiement" onSubmit={handleSubmit}>
        <h1>Paiement</h1>
        <p>Remplis tes informations pour recevoir ta commande.</p>

        {panier.length === 0 ? (
          <div className="messagePaiement erreurPaiement">
            Ton panier est vide. Retourne au panier avant de payer.
          </div>
        ) : (
          <div className="resumePaiement">
            <span>Total a payer</span>
            <strong>{totalPanier.toFixed(2)}$</strong>
          </div>
        )}

        {messageErreur && (
          <div className="messagePaiement erreurPaiement">{messageErreur}</div>
        )}

        <label>
          Email pour le reçu
          <input type="email" placeholder="exemple@email.com" required />
        </label>

        <label>
          Numéro de téléphone
          <input type="tel" placeholder="514 123 4567" required />
        </label>

        <label>
          Adresse de livraison
          <input type="text" placeholder="123 rue Principale" required />
        </label>

        <label>
          Ville
          <input type="text" placeholder="Montréal" required />
        </label>

        <div className="lignePaiement">
          <label>
            Code postal
            <input type="text" placeholder="H1H 1H1" required />
          </label>

          <label>
            Pays
            <input type="text" placeholder="Canada" required />
          </label>
        </div>

        <label>
          Nom sur la carte
          <input type="text" placeholder="Jean Dupont" required />
        </label>

        <label>
          Numéro de carte
          <input
            type="text"
            inputMode="numeric"
            minLength="12"
            maxLength="19"
            placeholder="1234 5678 9012 3456"
            required
          />
        </label>

        <div className="lignePaiement">
          <label>
            Expiration
            <input
              type="text"
              pattern="(0[1-9]|1[0-2])\/[0-9]{2}"
              placeholder="MM/AA"
              required
            />
          </label>

          <label>
            CVC
            <input
              type="text"
              inputMode="numeric"
              minLength="3"
              maxLength="4"
              placeholder="123"
              required
            />
          </label>
        </div>

        <button className="boutonPayer" type="submit" disabled={panier.length === 0}>
          Payer
        </button>
        <button
          className="boutonRetourPanier"
          type="button"
          onClick={() => navigate("/panier")}
        >
          Retour au panier
        </button>
      </form>
    </div>
  );
}
