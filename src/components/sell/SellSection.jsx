import { useNavigate } from "react-router-dom";
import "./SellSection.css";

export default function SellSection({ parfums }) {
  const navigate = useNavigate();

  const moyenne =
    parfums.length > 0
      ? (
          parfums.reduce((acc, parfum) => acc + (Number(parfum.price) || 0), 0) /
          parfums.length
        ).toFixed(1)
      : "0";

  return (
    <div className="sellSection">
      <div className="statsCard">
        <div className="statsNotif">Statistiques</div>

        <div className="statsList">
          <div className="statItem">
            <p className="statNom">Parfums total</p>
            <h3 className="statValeur">{parfums.length}</h3>
          </div>

          <div className="statItem">
            <p className="statNom">Utilisateurs total</p>
            <h3 className="statValeur">au moin 3....</h3>
          </div>



          <div className="statItem">
            <p className="statNom">Moyenne des Prix</p>
            <h3 className="statValeur">{moyenne}$</h3>
          </div>
        </div>
      </div>

      <div className="sellContent">
        <h2 className="sellTitre">
          Vendre / ajouter des parfums sur Mistify !
        </h2>

        <p className="sellSoustitre">
          (essayer de melanger vos parfum avec de l'eau pour augmenter le prix de vente...)
        </p>

        <button
          className="BTNvendre"
          onClick={() => navigate("/vendreParfum")}
        >
          Vendre un parfum
        </button>
      </div>
    </div>
  );
}