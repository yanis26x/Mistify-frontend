import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Profil.css";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";

const API = "http://localhost:3000/users";

export default function Profil() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [commandes, setCommandes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkUser() {
      try {
        const res = await axios.get(`${API}/whoami`, { withCredentials: true });
        setUser(res.data);
        const resCommandes = await axios.get("http://localhost:3000/commandes/mes-commandes", { withCredentials: true });
        setCommandes(resCommandes.data);
      } catch {
        navigate("/compte");
      } finally {
        setLoading(false);
      }
    }
    checkUser();
  }, [navigate]);

  async function handleSignout() {
    try {
      await axios.post(`${API}/signout`, {}, { withCredentials: true });
      window.dispatchEvent(new Event("auth-change"));
      navigate("/compte");
    } catch {
      navigate("/compte");
    }
  }

  if (loading) return null;

  return (
    <div className="profil-page">
      <Navbar
        user={user}
        onGoToCompte={() => navigate("/compte")}
        onGoToProfil={() => navigate("/profil", { state: { user } })}
      />

      <div className="container-profil">
        <aside className="menuProfil">
          <div className="profile-header">
            <img
              src="https://i.pinimg.com/474x/b1/48/8f/b1488fdac4488b4a116c6964c1735f60.jpg"
              alt={user?.name}
            />
            <p className="user-name">{user?.name || "Utilisateur"}</p>
            <p className="member-status">Membre Privilège</p>
          </div>

          <div className="sidebar-links">
            <button onClick={() => navigate("/compte")} className="link-active">Mon Compte</button>
            <button className="logout-btn" onClick={handleSignout}>Déconnexion</button>
          </div>
        </aside>

        <div className="right-section">
          <section className="card-white espacePerso">
            <div className="card-top-bar">
              <div>
                <span className="label-category">Espace Personnel</span>
                <h1 className="main-title">Mon Profil</h1>
              </div>
              <button className="btn-outline" onClick={() => navigate("/compte")}>Modifier</button>
            </div>

            <div className="info-grid">
              <div className="field">
                <label>Nom Complet</label>
                <p>{user?.name || "—"}</p>
              </div>
              <div className="field">
                <label>Adresse E-mail</label>
                <p>{user?.email || "—"}</p>
              </div>
              {user?.preferencesOlfactives && (
                <div className="field full-width">
                  <label>Préférence Olfactive</label>
                  <p>{user.preferencesOlfactives}</p>
                </div>
              )}
            </div>
          </section>

          <section className="card-white orderProfil">
            <div className="card-top-bar">
              <p className="section-subtitle">Mes Commandes</p>
              <span className="badge-status">{commandes.length} commande{commandes.length !== 1 ? "s" : ""}</span>
            </div>

            {commandes.length === 0 ? (
              <p style={{ color: "rgba(96,20,47,0.5)", fontSize: "14px" }}>Aucune commande pour le moment.</p>
            ) : (
              commandes.map((commande) => (
                <div key={commande.id} className="order-item-box" style={{ marginBottom: "12px" }}>
                  <div className="item-info">
                    <span className="order-number">
                      COMMANDE #{String(commande.id).padStart(5, "0")} · {new Date(commande.createdAt).toLocaleDateString("fr-CA")}
                    </span>
                    <h2 className="brand-name">
                      {commande.items.map((i) => i.name).join(", ")}
                    </h2>
                    <p className="product-type">
                      {commande.items.length} article{commande.items.length !== 1 ? "s" : ""}
                    </p>
                  </div>
                  <div className="item-pricing">
                    <p className="price-tag">{Number(commande.total).toFixed(2)}$</p>
                    <p className="badge-status" style={{ fontSize: "11px" }}>{commande.statut}</p>
                  </div>
                </div>
              ))
            )}
          </section>

          <section className="banner-dark exclusiveProfil">
            <span className="banner-label">Découverte Exclusive</span>
            <h2 className="banner-heading">Inspiré par votre élégance.</h2>
            <p className="banner-description">
              Basé sur votre passion pour les notes boisées, nous avons réservé
              un échantillon de notre nouvelle collection 'Éclat de Nuit' pour
              votre prochaine visite.
            </p>
            <button className="banner-btn" onClick={() => navigate("/parfums")}>
              Découvrir la collection
            </button>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
