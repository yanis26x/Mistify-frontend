import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Logged from "./Logged";
import CreateAcc from "./CreateAcc";
import Navbar from "../../components/navbar/Navbar";
import "./Compte.css";

const API = "http://localhost:3000/users";

export default function Compte() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkWhoAmI();
  }, []);

  async function checkWhoAmI() {
    setLoading(true);

    try {
      const res = await axios.get(`${API}/whoami`, {
        withCredentials: true,
      });

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
      const res = await axios.post(
        `${API}/signup`,
        {
          name,
          email,
          password,
          preferencesOlfactives,
        },
        {
          withCredentials: true,
        }
      );

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
      const res = await axios.post(
        `${API}/signin`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

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
      await axios.post(
        `${API}/signout`,
        {},
        {
          withCredentials: true,
        }
      );

      setUser(null);
      window.dispatchEvent(new Event("auth-change"));
      setMessage("Déconnexion réussie.");
    } catch (err) {
      setMessage(err?.response?.data?.message || "Erreur lors du signout.");
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
              message={message}
              onSignout={handleSignout}
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
    </>
  );
}
