import { useNavigate } from "react-router-dom";
import "./SellSection.css";

export default function SellSection({ parfums }) {
  const navigate = useNavigate();

  const moyenne =
    parfums.length > 0
      ? (
          parfums.reduce((acc, parfum) => acc + (Number(parfum.price) || 0), 0) /
          parfums.length
        ).toFixed(2)
      : "0";

  return (
    <div className="sellSection">
      <div className="statsCard">
        <div className="statsNotif">Statistiques</div>

        <div className="statsList">
          <div className="statItem">
            <p className="statNom">Parfums Total</p>
            <h3 className="statValeur">{parfums.length}</h3>
          </div>

          <div className="statItem">
            <p className="statNom">Utilisateurs Total</p>
            <h3 className="statValeur">Au moins 3....</h3>
          </div>



          <div className="statItem">
            <p className="statNom">Moyenne des Prix</p>
            <h3 className="statValeur">{moyenne}$</h3>
          </div>
        </div>
      </div>

      <div className="sellContent">
        <img
          className="sellLogoMistify"
          src="/SpotifyLogoRed.webp"
          alt="Mistify"
        />

        <div className="sellMessage">
          <h2 className="sellTitre">rEaD tHiS, n0w! 𖤐</h2>

          <p className="sellSoustitre">
            Je ne toucherai plus ce projet. Libre à vous de repartir de mon
            travail : boite vocale ajoutée, gestion des ajouts de parfums par
            les admins, notification promotionnelle quand un parfum est ajouté
            pour les utilisateurs ayant choisi la même odeur, énorme correction
            car rien ne marchait, et bien plus encore. Si mon travail ne vous
            satisfait pas (99% le cas), corrigez-le vous-même ou n'utilisez
            simplement pas ma version.
          </p>

          <button
            className="BTNvendre"
            onClick={() => navigate("/ajout-parfum")}
          >
            ajouter parfum
          </button>
        </div>
      </div>
    </div>
  );
}
