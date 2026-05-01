import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Payment.css";

export default function Payment() {
  const navigate = useNavigate();
  const [commandeValidee, setCommandeValidee] = useState(false);
  const [messageErreur, setMessageErreur] = useState("");

  const panier = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("panier")) || [];
    } catch {
      return [];
    }
  }, []);

  const totalPanier = panier.reduce((total, parfum) => {
    return total + Number(parfum.price || 0) * Number(parfum.quantite || 0);
  }, 0);

  function handleSubmit(e) {
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

    localStorage.removeItem("panier");
    setCommandeValidee(true);
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
