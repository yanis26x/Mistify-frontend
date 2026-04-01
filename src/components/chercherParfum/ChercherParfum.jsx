import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ChercherParfum.css";

const BACKEND_URL = "http://localhost:3000";

export default function ChercherParfum() {
  const [recherche, setRecherche] = useState("");
  const [parfums, setParfums] = useState([]);
  const [message, setMessage] = useState("");
  const [filterGender, setFilterGender] = useState("All");
  const [fromYear, setFromYear] = useState("");
  const [toYear, setToYear] = useState("");
  const [showFilters, setShowFilters] = useState(true);
  const navigate = useNavigate();

  async function handleSearch() {
    setMessage("");

    try {
      const res = await axios.get("http://localhost:3000/parfums");

      const resultats = res.data.filter((parfum) => {
        const matchName = parfum.name.toLowerCase().includes(recherche.toLowerCase());
        const matchGender = filterGender === "All" || parfum.gender === filterGender;
        const matchFromYear = !fromYear || parfum.year >= parseInt(fromYear);
        const matchToYear = !toYear || parfum.year <= parseInt(toYear);
        return matchName && matchGender && matchFromYear && matchToYear;
      });

      setParfums(resultats);

      if (resultats.length === 0) {
        setMessage("Aucun parfum trouvé...");
      } else {
        setMessage(`${resultats.length} parfum trouvé!`);
      }
    } catch (error) {
      setMessage("Erreur lors de la recherche");
    }
  }

  return (
    <section className="chercherSection">
      <h2 className="chercherTitre">Chercher un parfum</h2>

      {showFilters && (
        <div className="filtresSection">
          <button className="hideFiltersBtn" onClick={() => setShowFilters(false)}>
            🔻 Hide Filters
          </button>
          
          <div className="filtresContainer">
            <div className="filtresGroup">
              <label>Gender</label>
              <select value={filterGender} onChange={(e) => setFilterGender(e.target.value)}>
                <option value="All">All</option>
                <option value="Homme">Homme</option>
                <option value="Femme">Femme</option>
                <option value="Unisexe">Unisexe</option>
              </select>
            </div>
            
            <div className="filtresGroup">
              <label>From Year</label>
              <input
                type="number"
                placeholder="e.g., 2000"
                value={fromYear}
                onChange={(e) => setFromYear(e.target.value)}
              />
            </div>
            
            <div className="filtresGroup">
              <label>To Year</label>
              <input
                type="number"
                placeholder="e.g., 2024"
                value={toYear}
                onChange={(e) => setToYear(e.target.value)}
              />
            </div>
          </div>
          
          <button className="clearFiltersBtn" onClick={() => {
            setFilterGender("All");
            setFromYear("");
            setToYear("");
          }}>
            ✕ Clear Filters
          </button>
        </div>
      )}

      {!showFilters && (
        <button className="showFiltersBtn" onClick={() => setShowFilters(true)}>
          🔼 Show Filters
        </button>
      )}

      <div className="chercherBox">
        <input
          type="text"
          placeholder="Écris le nom du parfum..."
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
        />

        <button className="chercherBtn" onClick={handleSearch}>
          Chercher
        </button>
      </div>

      {message && <p className="chercherMessage">{message}</p>}

      <div className="chercherResultats">
        {parfums.map((parfum) => (
          <div key={parfum.id} className="parfumTrouve">
            <img
              src={parfum.imageUrl ? `${BACKEND_URL}${parfum.imageUrl}` : "/bloodd.png"}
              alt={parfum.name}
              className="parfumImage"
              onError={(e) => (e.target.src = "/bloodd.png")}
            />

            <div className="parfumContenu">
              <p className="parfumNom">{parfum.name}</p>
              <p className="parfumMarque">{parfum.brand}</p>
              <p className="parfumPrix">
                {parfum.price ? `${parfum.price}$` : "Prix non précisé"}
              </p>

              <button
                className="savoirPlusBtn"
                onClick={() => navigate(`/parfum/${parfum.id}`)}
              >
                En savoir plus
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}