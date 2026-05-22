import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MessagePerso.css";

const messages = [
  {
    titre: "NOTRE COLLECTION",
    sousTitre: "Explorez notre sélection de parfums et trouvez celui qui vous correspond.",
    bouton: "Voir les parfums",
    lien: "/parfums",
  },
  {
    titre: "VOUS NE TROUVEZ PAS ?",
    sousTitre: "Soumettez une demande et on cherche le parfum pour vous.",
    bouton: "Faire une demande",
    lien: "/ajout-parfum",
  },
  {
    titre: "COMMANDEZ EN LIGNE",
    sousTitre: "Ajoutez vos parfums au panier et finalisez votre commande en quelques clics.",
    bouton: "Voir les parfums",
    lien: "/parfums",
  },
  {
    titre: "UN COMPTE MISTIFY",
    sousTitre: "Créez un compte pour suivre vos commandes et indiquer vos préférences olfactives.",
    bouton: "Créer un compte",
    lien: "/compte",
  },
  {
    titre: "CONTACTEZ-NOUS",
    sousTitre: "Une question ou une suggestion ? Notre équipe est disponible pour vous répondre.",
    bouton: "Nous contacter",
    lien: "/contact",
  },
  {
    titre: "BOÎTE VOCALE",
    sousTitre: "Consultez vos notifications et les réponses à vos demandes de parfums.",
    bouton: "Voir mes messages",
    lien: "/boite-vocale",
  },
  {
    titre: "7 FAMILLES OLFACTIVES",
    sousTitre: "Florale, boisée, orientale, hespéridée… trouvez la famille qui vous correspond.",
    bouton: "Explorer",
    lien: "/parfums",
  },
];

function choisirMessagePerso() {
  const indexAleatoire = Math.floor(Math.random() * messages.length);
  return messages[indexAleatoire];
}

export default function MessagePerso() {
  const navigate = useNavigate();
  const [messageActuel, setMessageActuel] = useState(choisirMessagePerso);

  useEffect(() => {
    const minuteur = setInterval(() => {
      setMessageActuel(choisirMessagePerso());
    }, 8000); // chq 8 secondes

    return () => clearInterval(minuteur);
  }, []);

  return (
    <div className="messagePersoSection">
      <div className="messageAleatoire">
        <div className="messageAleatoireContenu">
          {messageActuel.titre && (
            <h3 className="messageAleatoireTitre">{messageActuel.titre}</h3>
          )}

          {messageActuel.sousTitre && (
            <p className="messageAleatoireSousTitre">
              {messageActuel.sousTitre}
            </p>
          )}
        </div>

        {messageActuel.bouton && (
          <button
            className="messageAleatoireBtn"
            onClick={() => navigate(messageActuel.lien)}
          >
            {messageActuel.bouton}
          </button>
        )}
      </div>

      <div className="messagePerso">
        <img
          className="messagePersoLogo"
          src="/SpotifyLogoRed.webp"
          alt="Mistify"
        />

        <div className="messagePersoContenu">
          <h2 className="messagePersoTitre">Mistify</h2>

          <p className="messagePersoSousTitre">
            Mistify est un site de vente de parfums. Parcourez la collection,
            filtrez par famille olfactive, genre ou prix, et commandez en quelques clics.
            Vous ne trouvez pas ce que vous cherchez ? Soumettez une demande et on s'en occupe.
          </p>

          <p className="messagePersoTexteDiscret">
            © 2026 Mistify — tous droits réservés
          </p>
        </div>
      </div>
    </div>
  );
}
