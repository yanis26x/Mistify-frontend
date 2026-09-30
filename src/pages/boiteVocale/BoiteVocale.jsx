import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { FiTrash2 } from "react-icons/fi";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import "./BoiteVocale.css";



export default function BoiteVocale() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState("");

  useEffect(() => {
    async function chargerPage() {
      try {
        const reponseUtilisateur = await api.get(`/users/whoami`, {
          withCredentials: true,
        });
        setUser(reponseUtilisateur.data);

        const messagesRes = await api.get(`/notifications/mes-notifications`, {
          withCredentials: true,
        });
        setMessages(messagesRes.data);
      } catch (err) {
        setErreur(
          err?.response?.data?.message ||
            "Vous devez etre connecte pour voir la boite vocale....."
        );
      } finally {
        setChargement(false);
      }
    }

    chargerPage();
  }, []);

  async function supprimerMessage(id) {
    try {
      await api.delete(`/notifications/${id}`, {
        withCredentials: true,
      });

      setMessages((anciensMessages) =>
        anciensMessages.filter((message) => message.id !== id)
      );
      window.dispatchEvent(new Event("boite-vocale-change"));
    } catch {
      setErreur("Impossible de supprimer...");
    }
  }

  return (
    <>
      <Navbar user={user} onGoToCompte={() => navigate("/compte")} />

      <main className="boiteVocalePage">
        <section className="boiteVocaleBloc">
          <h1>Mes Notifications</h1>

          {chargement ? (
            <p>Chargement...</p>
          ) : erreur ? (
            <div className="boiteVocaleMessage">
              <p>{erreur}</p>
              <button type="button" onClick={() => navigate("/compte")}>
                Se connecter
              </button>
            </div>
          ) : messages.length === 0 ? (
            <p>Aucun message.....</p>
          ) : (
            <div className="boiteVocaleListe">
              {messages.map((message) => (
                <article
                  className="boiteVocaleCarte"
                  key={message.id}
                >
                  <div>
                    <p className="texteMessageNouveau">{message.contenu}</p>
                    <span>{new Date(message.dateEnvoi).toLocaleString()}</span>
                  </div>

                  <div className="boiteVocaleActions">
                    {message.lien && (
                      <Link to={message.lien}>
                        Voir le parfum
                      </Link>
                    )}

                    <button
                      className="boutonSupprimerMessage"
                      type="button"
                      title="Supprimer le message"
                      aria-label="Supprimer le message"
                      onClick={() => supprimerMessage(message.id)}
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
