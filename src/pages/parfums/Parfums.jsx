import { useEffect, useState } from "react";
import axios from "axios";
import ParfumCard from "../../components/ParfumCard/ParfumCard";
import "./Parfums.css";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import NavbarRecherche from "../../components/navbarRecherche/NavbarRecherche";

const API = "http://localhost:3000";

export default function Parfums() {
  const [parfums, setParfums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [gender, setGender] = useState("All");
  const [prixMax, setPrixMax] = useState("");
  const [famille, setFamille] = useState("All");

  useEffect(() => {
    async function fetchParfums() {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get(`${API}/parfums`);
        setParfums(res.data);
      } catch {
        setError("Erreur lors du chargement des parfums");
      } finally {
        setLoading(false);
      }
    }
    fetchParfums();
  }, []);

  const parfumsFiltres = parfums.filter((p) => {
    const matchGender = gender !== "All" ? p.gender === gender : true;
    const matchPrix = prixMax !== "" ? p.price <= parseFloat(prixMax) : true;
    const familleParfum = p.famille?.name ?? p.family ?? "";
    const matchFamille = famille !== "All"
      ? familleParfum.toLowerCase() === famille.toLowerCase()
      : true;
    return matchGender && matchPrix && matchFamille;
  });

  return (
    <>
      <Navbar />
      <section className="parfumsPage">
        <div className="parfumsHeader">
        <h1 className="parfumsTitre">Notre Collection</h1>
        <p className="parfumsDesc">Découvrez notre sélection de parfums pour tous les goûts et toutes les occasions.</p>
        </div>

        <NavbarRecherche />

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

          <select
            className="parfumsSelect"
            value={famille}
            onChange={(e) => setFamille(e.target.value)}
          >
            <option value="All">Toutes les familles</option>
            <option value="hesperidee">Hespéridée</option>
            <option value="florale">Florale</option>
            <option value="fougere">Fougère</option>
            <option value="chypree">Chyprée</option>
            <option value="boisee">Boisée</option>
            <option value="orientale">Orientale</option>
            <option value="aromatique">Aromatique</option>
          </select>

          <button
            className="parfumsResetBtn"
            onClick={() => {
              setGender("All");
              setPrixMax("");
              setFamille("All");
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
