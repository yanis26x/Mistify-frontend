import { useNavigate } from "react-router-dom";
import "./SellSection.css";

export default function SellSection({ parfums }) {
  const navigate = useNavigate();


  return (
    <div className="sellSection">
      <div className="sellStatsCard">
        <p className="sellStatsLabel">Notre collection</p>
        <h2 className="sellStatsBrand">Mistify</h2>
        <div className="sellStatsDivider" />
        <div className="sellStatsCount">
          <span className="sellStatsNumber">{parfums.length}</span>
          <span className="sellStatsUnit">parfums</span>
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
