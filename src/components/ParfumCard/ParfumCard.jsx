import { useNavigate } from "react-router-dom";
import "./ParfumCard.css";

const BACKEND_URL = "http://localhost:3000";

export default function ParfumCard({ parfum }) {
  const navigate = useNavigate();

  return (
    <div className="parfumCard">
      <img
        src={parfum.imageUrl ? `${BACKEND_URL}${parfum.imageUrl}` : "/flacon-parfum.png"}
        alt={parfum.name}
        className="parfumCardImage"
        onError={(e) => (e.target.src = "/flacon-parfum.png")}
      />
      <div className="parfumCardBody">
        <p className="parfumCardMarque">{parfum.brand}</p>
        <h3 className="parfumCardNom">{parfum.name}</h3>
        <p className="parfumCardDesc">{parfum.description}</p>
        <p className="parfumCardPrix">{parfum.price} $</p>
        <button
          className="parfumCardBtn"
          onClick={() => navigate(`/parfum/${parfum.id}`)}
        >
          VOIR LE PARFUM
        </button>
      </div>
    </div>
  );
}
