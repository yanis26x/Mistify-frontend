import { useState } from "react";
import axios from "axios";
import "./App.css";

const API = "http://localhost:3000/auth";

export default function App() {
  const [name, setName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  const [signinEmail, setSigninEmail] = useState("");
  const [signinPassword, setSigninPassword] = useState("");

  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");

  async function handleSignup(e) {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post(
        `${API}/signup`,
        {
          name,
          email: signupEmail,
          password: signupPassword,
        },
        {
          withCredentials: true,
        }
      );

      setUser(res.data);
      setMessage("Compte créé !");
    } catch (err) {
      setMessage(err?.response?.data?.message || "Erreur signup");
    }
  }

  async function handleSignin(e) {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post(
        `${API}/signin`,
        {
          email: signinEmail,
          password: signinPassword,
        },
        {
          withCredentials: true,
        }
      );

      setUser(res.data);
      setMessage("Connexion réussie !");
    } catch (err) {
      setMessage(err?.response?.data?.message || "Erreur signin");
    }
  }

  async function handleWhoAmI() {
    setMessage("");

    try {
      const res = await axios.get(`${API}/whoami`, {
        withCredentials: true,
      });

      setUser(res.data);
      setMessage("Utilisateur connecté récupéré");
    } catch (err) {
      setUser(null);
      setMessage(err?.response?.data?.message || "Pas connecté");
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
      setMessage("Déconnecté");
    } catch (err) {
      setMessage(err?.response?.data?.message || "Erreur signout");
    }
  }

  return (
    <div className="container">
      <h1>Mistify Auth</h1>
      <h2>ughhhh hello..?!</h2>
      <h3>pr admin signin avec : yanis26x@hotmail.com mdp</h3>

      <div className="box">
        <h2>Signup</h2>
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Nom"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={signupEmail}
            onChange={(e) => setSignupEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={signupPassword}
            onChange={(e) => setSignupPassword(e.target.value)}
          />
          <button type="submit">Créer un compte</button>
        </form>
      </div>

      <div className="box">
        <h2>Signin</h2>
        <form onSubmit={handleSignin}>
          <input
            type="email"
            placeholder="Email"
            value={signinEmail}
            onChange={(e) => setSigninEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={signinPassword}
            onChange={(e) => setSigninPassword(e.target.value)}
          />
          <button type="submit">Se connecter</button>
        </form>
      </div>

      <div className="box">
        <h2>Session</h2>
        <div className="buttons">
          <button onClick={handleWhoAmI}>Who am I</button>
          <button onClick={handleSignout}>Sign out</button>
        </div>

        {message && <p className="message">{message}</p>}

        <pre>{user ? JSON.stringify(user, null, 2) : "Aucun user connecté"}</pre>
      </div>
    </div>
  );
}