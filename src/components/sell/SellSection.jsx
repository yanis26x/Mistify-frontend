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
          <h2 className="sellTitre">𖤐 YOUR AD HERE  </h2>

          <p className="sellSoustitre">
   N’oubliez pas que
  votre satisfaction n’a absolument aucune importance pour nous. On vend des
  parfums, pas du bonheur. Si l’odeur dure plus de 3 heures, estimez-vous
  chanceux, puisqu’on ajoute de l’eau dans la majorité de nos parfums pour
  maximiser les profits
          </p>

          <p className="TextBelek">
           NE PAS MODIFIER CETTE SECTION
          </p>

          {/* <button
            className="BTNvendre"
            onClick={() => navigate("/ajout-parfum")}
          >
            ajouter parfum
          </button> */}
        </div>
      </div>
    </div>
  );
}
