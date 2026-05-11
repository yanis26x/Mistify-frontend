import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MessagePerso.css";

const messages = [
  {
    titre: "𖤐NOTRE COLLECTION",
    sousTitre: "Va voir tous les parfums disponibles dans notre collection.",
    bouton: "Voir les parfums",
    lien: "/parfums",
  },
  {
    titre: "𖤐AJOUTE UN PARFUM",
    sousTitre: "Partage ton parfum préféré et enrichis la collection 2 Mistify.",
    bouton: "Ajouter un parfum",
    lien: "/ajout-parfum",
  },
  {
    sousTitre: "© 2026 Mistify - all rights reserved.",
  },
  {
    titre: "𖤐MISTIFY",
    sousTitre: "votre satifaction est loin d'être notre prioriter",
  },
  {
    titre: "𖤐CONTACTEZ-NOUS",
    sousTitre: "Une question, une insulte, une suggestion ou une demande ? On lit parfois nos messages",
    bouton: "Nous contacter",
    lien: "/contact",
  },
  {
    titre: "𖤐BOÎTE VOCALE",
    sousTitre: "Regarde tes messages",
    bouton: "Voir les messages",
    lien: "/boite-vocale",
  },
  {
    sousTitre: "Tout les parfums sont melangés avec de l'eau pour maximiser les profits..",
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
          <h2 className="messagePersoTitre">YOUR AD HERE 𖤐 </h2>

          <p className="messagePersoSousTitre">
            N’oubliez pas que votre satisfaction n’a absolument aucune
            importance pour nous. On vend des parfums, pas du bonheur. Si
            l’odeur dure plus de 3 heures, estimez-vous chanceux, puisqu’on
            ajoute de l’eau dans la majorité de nos parfums pour maximiser les
            profits.
          </p>

          <p className="messagePersoTexteDiscret">
            DOWNLOAD Qibla++ ON THE APP STORE NOW!!
          </p>
        </div>
      </div>
    </div>
  );
}
