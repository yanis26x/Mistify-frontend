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
          src="/logo-mistify.png"
          alt="Mistify"
        />

        <div className="sellMessage">
          <h2 className="sellTitre">L'art de la fragrance, à votre portée.</h2>

          <p className="sellSoustitre">
            Mistify est votre destination exclusive pour découvrir, explorer et
            acquérir les plus belles fragrances du monde. Que vous soyez
            amateur ou connaisseur, notre collection soigneusement sélectionnée
            saura éveiller vos sens et vous transporter dans un univers
            olfactif unique.
          </p>

          <button
            className="BTNvendre"
            onClick={() => navigate("/parfums")}
          >
            Découvrir la collection
          </button>
        </div>
      </div>
    </div>
  );
}
