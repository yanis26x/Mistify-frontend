import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Logged from "./Logged";
import CreateAcc from "./CreateAcc";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import "./Compte.css";

const API = "http://localhost:3000/users";

export default function Compte() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkWhoAmI();
  }, []);

  async function checkWhoAmI() {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/whoami`, { withCredentials: true });
      setUser(res.data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  async function handleSignup({ name, email, password, preferencesOlfactives }) {
    setMessage("");
    try {
      const res = await axios.post(`${API}/signup`, { name, email, password, preferencesOlfactives }, { withCredentials: true });
      setUser(res.data);
      window.dispatchEvent(new Event("auth-change"));
      setMessage("Compte créé avec succès.");
    } catch (err) {
      setMessage(err?.response?.data?.message || "Erreur lors du signup.");
    }
  }

  async function handleSignin({ email, password }) {
    setMessage("");
    try {
      const res = await axios.post(`${API}/signin`, { email, password }, { withCredentials: true });
      setUser(res.data);
      window.dispatchEvent(new Event("auth-change"));
      setMessage("Connexion réussie.");
    } catch (err) {
      setMessage(err?.response?.data?.message || "Erreur lors du signin.");
    }
  }

  async function handleSignout() {
    setMessage("");
    try {
      await axios.post(`${API}/signout`, {}, { withCredentials: true });
      setUser(null);
      setUsers([]);
      window.dispatchEvent(new Event("auth-change"));
      setMessage("Déconnexion réussie.");
    } catch (err) {
      setMessage(err?.response?.data?.message || "Erreur lors du signout.");
    }
  }

  async function handleRefreshUser() {
    setMessage("");
    try {
      const res = await axios.get(`${API}/whoami`, { withCredentials: true });
      setUser(res.data);
      window.dispatchEvent(new Event("auth-change"));
      setMessage("Session mise à jour.");
    } catch (err) {
      setUser(null);
      setMessage(err?.response?.data?.message || "Aucun utilisateur connecté.");
    }
  }

  async function handleGetAllUsers() {
    setMessage("");
    try {
      const res = await axios.get(`${API}`, { withCredentials: true });
      setUsers(res.data);
      setMessage("Liste des utilisateurs récupérée.");
    } catch (err) {
      setMessage(err?.response?.data?.message || "Erreur récupération users.");
    }
  }

  async function handleDeleteUser(userId) {
    if (!userId) { setMessage("Entre un ID valide."); return; }
    setMessage("");
    try {
      await axios.delete(`${API}/${userId}`, { withCredentials: true });
      setUsers((prev) => prev.filter((u) => String(u.id) !== String(userId)));
      if (user && String(user.id) === String(userId)) setUser(null);
      setMessage(`Utilisateur ${userId} supprimé.`);
    } catch (err) {
      setMessage(err?.response?.data?.message || "Erreur suppression user!");
    }
  }

  async function handleDeleteAllUsers() {
    setMessage("");
    try {
      await axios.delete(`${API}`, { withCredentials: true });
      setUsers([]);
      setUser(null);
      setMessage("Tous les utilisateurs ont été supprimés!");
    } catch (err) {
      setMessage(err?.response?.data?.message || "euuuuu...");
    }
  }

  return (
    <>
      {user && <Navbar user={user} onGoToCompte={() => navigate("/compte")} />}
      <div className="compte-page">
        <div className="compte-container">
          {loading ? (
            <div className="comptee"></div>
          ) : user ? (
            <Logged
              user={user}
              users={users}
              message={message}
              onRefreshUser={handleRefreshUser}
              onSignout={handleSignout}
              onGetAllUsers={handleGetAllUsers}
              onDeleteUser={handleDeleteUser}
              onDeleteAllUsers={handleDeleteAllUsers}
            />
          ) : (
            <CreateAcc
              message={message}
              onSignup={handleSignup}
              onSignin={handleSignin}
            />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
