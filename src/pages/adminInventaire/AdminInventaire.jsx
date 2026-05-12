import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { getImageUrl } from "../../utils/imageUrl";
import NavbarRecherche from "../../components/navbarRecherche/NavbarRecherche";
import "./AdminInventaire.css";

const API_URL = "http://localhost:3000";

export default function AdminInventaire() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [parfums, setParfums] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function chargerPage() {
      try {
        const resUser = await axios.get(`${API_URL}/users/whoami`, { withCredentials: true });
        if (!resUser.data?.admin) { navigate("/"); return; }
        setUser(resUser.data);
        const resParfums = await axios.get(`${API_URL}/parfums`, { withCredentials: true });
        setParfums(Array.isArray(resParfums.data) ? resParfums.data : []);
      } catch {
        navigate("/");
      } finally {
        setChargement(false);
      }
    }
    chargerPage();
  }, [navigate]);

  async function supprimerParfum(id) {
    if (!window.confirm("Supprimer ce parfum ?")) return;
    try {
      await axios.delete(`${API_URL}/parfums/${id}`, { withCredentials: true });
      setParfums((prev) => prev.filter((p) => p.id !== id));
      setMessage("Parfum supprimé.");
    } catch {
      setMessage("Erreur lors de la suppression.");
    }
  }


  const parfumsFiltres = parfums;

  const totalParfums = parfums.length;
  const moyennePrix = parfums.length > 0
    ? (parfums.reduce((acc, p) => acc + Number(p.price || 0), 0) / parfums.length).toFixed(2)
    : "0";
  const disponibles = parfums.filter((p) => p.disponibility !== false).length;

  if (chargement) return <div className="invChargement">Chargement...</div>;

  return (
    <div className="invPage">
      <Navbar user={user} onGoToCompte={() => navigate("/compte")} />

      <main className="invMain">
        <div className="invEntete">
          <div>
            <p className="invSurtitre">Administration</p>
            <h1 className="invTitre">Gestion de l'inventaire</h1>
            <p className="invDesc">Suivez et gérez votre collection de parfums.</p>
          </div>
          <button className="invBtnAjouter" onClick={() => navigate("/ajout-parfum")}>
            + Ajouter un parfum
          </button>
        </div>

        <div className="invStats">
          <div className="invStatCard">
            <p className="invStatLabel">Total parfums</p>
            <h2 className="invStatValeur">{totalParfums}</h2>
          </div>
          <div className="invStatCard">
            <p className="invStatLabel">Disponibles</p>
            <h2 className="invStatValeur">{disponibles}</h2>
          </div>
          <div className="invStatCard">
            <p className="invStatLabel">Prix moyen</p>
            <h2 className="invStatValeur">{moyennePrix} $</h2>
          </div>
        </div>

        {message && <p className="invMessage">{message}</p>}

        <div className="invRecherche">
          <NavbarRecherche />
        </div>

        <div className="invTableau">
          <div className="invTableauEntete">
            <span>Image</span>
            <span>Nom du parfum</span>
            <span>Marque</span>
            <span>Prix</span>
            <span>Famille</span>
            <span>Actions</span>
          </div>

          {parfumsFiltres.length === 0 ? (
            <p className="invVide">Aucun parfum trouvé.</p>
          ) : (
            parfumsFiltres.map((parfum) => (
              <div key={parfum.id} className="invLigne">
                <div className="invColImage">
                  <img
                    src={getImageUrl(parfum.imageUrl, "")}
                    alt={parfum.name}
                    onError={(e) => (e.target.src = "/flacon-parfum.png")}
                  />
                </div>

                <div className="invColNom">
                  <strong>{parfum.name}</strong>
                  <small>{parfum.gender || ""} {parfum.volume ? `· ${parfum.volume}ml` : ""}</small>
                </div>
                <span className="invColMarque">{parfum.brand}</span>
                <span className="invColPrix">{parfum.price} $</span>
                <span className="invColFamille">{parfum.famille?.name || "—"}</span>
                <div className="invColActions">
                  <button className="invBtnSuppr" onClick={() => supprimerParfum(parfum.id)}>Supprimer</button>
                </div>
              </div>
            ))
          )}
        </div>

        <p className="invCount">Affichage de {parfumsFiltres.length} sur {totalParfums} parfums</p>
      </main>

      <Footer />
    </div>
  );
}
