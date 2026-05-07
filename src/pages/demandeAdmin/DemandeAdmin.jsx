import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import "./DemandeAdmin.css";

const API_AUTH = "http://localhost:3000/auth";

export default function DemandeAdmin() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [chargement, setChargement] = useState(true);

  useEffect(() => {
    async function verifierUtilisateur() {
      try {
        const res = await axios.get(`${API_AUTH}/whoami`, {
          withCredentials: true,
        });

        setUser(res.data);
      } catch {
        setUser(null);
      } finally {
        setChargement(false);
      }
    }

    verifierUtilisateur();
  }, []);

  return (
    <>
      <Navbar user={user} onGoToCompte={() => navigate("/compte")} />

      <main className="demandeAdminPage">
        {chargement ? (
          <p>Chargement...</p>
        ) : !user ? (
          <div className="demandeAdminMessage">
            <p>Vous devez etre connecte pour voir cette page.</p>
            <button type="button" onClick={() => navigate("/compte")}>
              Se connecter
            </button>
          </div>
        ) : user.admin ? (
          <h1>Bienvenue dans la page demande admin</h1>
        ) : (
          <p>Reserve uniquement aux admins, vous ne l'etes pas...</p>
        )}
      </main>
    </>
  );
}
