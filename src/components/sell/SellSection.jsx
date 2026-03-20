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
        <div className="statsLabel">Statistiques</div>

        <div className="statsList">
          <div className="statItem">
            <p className="statName">Parfums total</p>
            <h3 className="statValue">{parfums.length}</h3>
          </div>

          <div className="statItem">
            <p className="statName">Utilisateurs total</p>
            <h3 className="statValue">au moin 3....</h3>
          </div>



          <div className="statItem">
            <p className="statName">Moyenne des Prix</p>
            <h3 className="statValue">{moyenne}$</h3>
          </div>
        </div>
      </div>

      <div className="sellContent">
        <h2 className="sellTitle">
          Vendre / ajouter des parfums sur Mistify !
        </h2>

        <p className="sellSubtitle">
          Vous avez un parfum que vous n’utilisez plus!? (ou vous manquez
          vraiment d'argent...) Sur Mistify, vous pouvez facilement vendre vos
          parfums et les partager avec d'autres passionnés!
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