import { useEffect, useState } from "react";
import axios from "axios";
import ParfumCard from "../../components/ParfumCard/ParfumCard";
import "./Parfums.css";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";

const API = "http://localhost:3000";

export default function Parfums() {
  const [parfums, setParfums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [gender, setGender] = useState("All");
  const [prixMax, setPrixMax] = useState("");
  const [anneeMin, setAnneeMin] = useState("");

  useEffect(() => {
    async function fetchParfums() {
      setLoading(true);
      setError("");
      try {
        let url = `${API}/parfums`;

        if (gender !== "All") {
          url = `${API}/parfums/filter/gender/${gender}`;
        } else if (prixMax !== "") {
          url = `${API}/parfums/filter/price/${prixMax}`;
        } else if (anneeMin !== "") {
          url = `${API}/parfums/filter/year/${anneeMin}`;
        }

        const res = await axios.get(url);
        setParfums(res.data);
      } catch {
        setError("Erreur lors du chargement des parfums");
      } finally {
        setLoading(false);
      }
    }
    fetchParfums();
  }, [gender, prixMax, anneeMin]);

  const parfumsFiltres = parfums.filter((p) => {
    const matchPrix = prixMax !== "" ? p.price <= parseFloat(prixMax) : true;
    const matchAnnee = anneeMin !== "" ? p.year >= parseInt(anneeMin) : true;
    return matchPrix && matchAnnee;
  });

  return (
    <>
      <Navbar />
      <section className="parfumsPage">
        <div className="parfumsHeader">
        <h1 className="parfumsTitre">Notre Collection</h1>
        <p className="parfumsDesc">Découvrez notre sélection de parfums pour tous les goûts et toutes les occasions.</p>
        </div>

        <div className="parfumsFiltres">
          <select
            className="parfumsSelect"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="All">Tous</option>
            <option value="Homme">Homme</option>
            <option value="Femme">Femme</option>
            <option value="Unisexe">Unisexe</option>
          </select>

          <input
            className="parfumsInput"
            type="number"
            placeholder="Prix max ($)"
            value={prixMax}
            onChange={(e) => setPrixMax(e.target.value)}
          />

          <input
            className="parfumsInput"
            type="number"
            placeholder="Année min"
            value={anneeMin}
            onChange={(e) => setAnneeMin(e.target.value)}
          />

          <button
            className="parfumsResetBtn"
            onClick={() => {
              setGender("All");
              setPrixMax("");
              setAnneeMin("");
            }}
          >
            Réinitialiser
          </button>

          {!loading && !error && (
            <p className="parfumsCount">{parfumsFiltres.length} parfum(s)</p>
          )}
        </div>

        {loading && <p className="parfumsLoading">Chargement...</p>}
        {error && <p className="parfumsError">{error}</p>}

        {!loading && !error && (
          <>
            <div className="parfumsGrille">
              {parfumsFiltres.map((parfum) => (
                <ParfumCard key={parfum.id} parfum={parfum} />
              ))}
            </div>
          </>
        )}
      </section>
      <Footer />
    </>
  );
}