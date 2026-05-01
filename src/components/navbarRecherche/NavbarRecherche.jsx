import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import "./NavbarRecherche.css";

const API_URL = "http://localhost:3000";

export default function NavbarRecherche() {
  const navigate = useNavigate();
  const [recherche, setRecherche] = useState("");
  const [parfums, setParfums] = useState([]);
  const [rechercheActive, setRechercheActive] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/parfums`)
      .then((reponse) => reponse.json())
      .then((data) => setParfums(Array.isArray(data) ? data : []))
      .catch(() => setParfums([]));
  }, []);

  const terme = recherche.toLowerCase();
  const resultats = parfums
    .filter((parfum) =>
      `${parfum.name || ""} ${parfum.brand || ""}`.toLowerCase().includes(terme)
    )
    .slice(0, 6);

  return (
    <div className="navbarRecherche">
      <FiSearch className="navbarRechercheIcone" />
      <input
        type="text"
        value={recherche}
        onChange={(e) => setRecherche(e.target.value)}
        onFocus={() => setRechercheActive(true)}
        onBlur={() => setTimeout(() => setRechercheActive(false), 120)}
        placeholder="Rechercher un parfum..."
        className="navbarRechercheInput"
      />

      {rechercheActive && (
        <div className="navbarRechercheListe">
          {resultats.length > 0 ? (
            resultats.map((parfum) => (
              <button
                type="button"
                key={parfum.id}
                className="navbarRechercheItem"
                onMouseDown={() => navigate(`/parfum/${parfum.id}`)}
              >
                <img
                  src={parfum.imageUrl ? `${API_URL}${parfum.imageUrl}` : "/bloodd.png"}
                  alt={parfum.name}
                  onError={(e) => {
                    e.currentTarget.src = "/bloodd.png";
                  }}
                />
                <span>
                  <strong>{parfum.name}</strong>
                  <small>{parfum.brand || "Marque inconnue"}</small>
                </span>
                <em>{parfum.price ? `${parfum.price}$` : ""}</em>
              </button>
            ))
          ) : (
            <div className="navbarRechercheVide">Aucun parfum trouve...</div>
          )}
        </div>
      )}
    </div>
  );
}
