import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import "./DemandeAdmin.css";

const API_URL = "http://localhost:3000";

export default function DemandeAdmin() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [chargement, setChargement] = useState(true);
  const [demandes, setDemandes] = useState([]);
  const [message, setMessage] = useState("");
  const [messagesAdmin, setMessagesAdmin] = useState({});

  useEffect(() => {
    async function verifierUtilisateur() {
      try {
        const res = await axios.get(`${API_URL}/users/whoami`, {
          withCredentials: true,
        });

        setUser(res.data);
        if (res.data?.admin) {
          chargerDemandes();
        }
      } catch {
        setUser(null);
      } finally {
        setChargement(false);
      }
    }

    verifierUtilisateur();
  }, []);

  async function chargerDemandes() {
    try {
      const res = await axios.get(`${API_URL}/ajout/demandes/en-attente`, {
        withCredentials: true,
      });

      setDemandes(res.data);
    } catch (err) {
      setMessage(err?.response?.data?.message || "Erreur..");
    }
  }

  function changerMessageAdmin(id, valeur) {
    setMessagesAdmin((anciensMessages) => ({
      ...anciensMessages,
      [id]: valeur,
    }));
  }

  async function accepterDemande(id) {
    setMessage("");

    try {
      await axios.post(
        `${API_URL}/ajout/accepter/${id}`,
        {
          messageAdmin: messagesAdmin[id] || "",
        },
        {
          withCredentials: true,
        }
      );

      setDemandes((anciennesDemandes) =>
        anciennesDemandes.filter((demande) => demande.id !== id)
      );
      window.dispatchEvent(new Event("demandes-parfum-change"));
      setMessage("Demande acceptée. Le parfum a été ajouté dans la base de données");
    } catch (err) {
      setMessage(err?.response?.data?.message || "Erreur lors de l'ajout du parfum dans la base de données.");
    }
  }

  async function refuserDemande(id) {
    setMessage("");

    try {
      await axios.post(
        `${API_URL}/ajout/refuser/${id}`,
        {
          messageAdmin: messagesAdmin[id] || "",
        },
        {
          withCredentials: true,
        }
      );

      setDemandes((anciennesDemandes) =>
        anciennesDemandes.filter((demande) => demande.id !== id)
      );
      window.dispatchEvent(new Event("demandes-parfum-change"));
      setMessage("Demande refusée et supprimée.");
    } catch (err) {
      setMessage(err?.response?.data?.message || "Erreur...");
    }
  }

  return (
    <>
      <Navbar user={user} onGoToCompte={() => navigate("/compte")} />

      <main className="demandeAdminPage">
        {chargement ? (
          <p>Chargement...</p>
        ) : !user ? (
          <div className="demandeAdminMessage">
            <p>Vous devez être connecté en tant qu'ADMIN pour voir cette page.</p>
            <button type="button" onClick={() => navigate("/compte")}>
              Se connecter
            </button>
          </div>
        ) : user.admin ? (
          <section className="demandesAdminBloc">
            <div className="demandesAdminHeader">
              <h1>Demandes de parfum en attente</h1>
            </div>

            {message && <p className="demandeAdminInfo">{message}</p>}

            {demandes.length === 0 ? (
              <p>Aucune demande en attente...</p>
            ) : (
              <div className="demandesListe">
                {demandes.map((demande) => (
                  <article className="demandeCarte" key={demande.id}>
                    <div>
                      <h2>
                        {demande.brand} - {demande.name}
                      </h2>
                      <p>{demande.description || "Pas de description."}</p>
                      <div className="demandeDetails">
                        <span>Genre: {demande.gender || "Non précisé"}</span>
                        <span>Famille: {demande.family || "Non précisée"}</span>
                        <span>Prix: {demande.price ? `${demande.price}$` : "Non précisé"}</span>
                        <span>Volume: {demande.volume ? `${demande.volume} ml` : "Non précisé"}</span>
                        <span>Annee: {demande.year || "Non précisée"}</span>
                        <span>Utilisateur: {demande.user?.name || "Inconnu"}</span>
                      </div>
                    </div>

                    {demande.imageUrl && (
                      <img src={demande.imageUrl} alt={`${demande.brand} ${demande.name}`} />
                    )}

                    <label className="messageAdminLabel">
                      Message personnalisé pour l'utilisateur
                      <textarea
                        value={messagesAdmin[demande.id] || ""}
                        onChange={(event) =>
                          changerMessageAdmin(demande.id, event.target.value)
                        }
                        placeholder="Ex: Merci pour ta demande, on l'a acceptée car..."
                      />
                    </label>

                    <div className="demandeActions">
                      <button type="button" onClick={() => accepterDemande(demande.id)}>
                        Accepter
                      </button>
                      <button type="button" onClick={() => refuserDemande(demande.id)}>
                        Refuser
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        ) : (
          <p>Réservé uniquement aux admins, vous ne l'êtes pas...</p>
        )}
      </main>
    </>
  );
}
