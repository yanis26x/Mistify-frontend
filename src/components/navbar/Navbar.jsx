import "./Navbar.css";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FiUser, FiShoppingCart, FiMail } from "react-icons/fi";
import NavbarRecherche from "../navbarRecherche/NavbarRecherche";
import DialoguePersona from "../dialoguePersona/DialoguePersona";

const API_URL = "http://localhost:3000";

export default function Navbar({ user, onGoToCompte }) {
  const [utilisateurSession, setUtilisateurSession] = useState(user || null);
  const utilisateurActuel = user || utilisateurSession;
  const photoProfil = utilisateurActuel?.admin ? "/vampp.jpeg" : "/Hello-kitty.webp";
  const [nombrePanier, setNombrePanier] = useState(0);
  const [messagesNonLus, setMessagesNonLus] = useState(0);
  const [demandesEnAttente, setDemandesEnAttente] = useState(0);
  const [afficherDialogueMessage, setAfficherDialogueMessage] = useState(false);
  const [derniereNotif, setDerniereNotif] = useState("");
  const dernierMessageAnnonce = useRef(0);

  useEffect(() => {
    async function chargerUtilisateurSession() {
      if (user) return;
      try {
        const res = await axios.get(`${API_URL}/users/whoami`, { withCredentials: true });
        setUtilisateurSession(res.data);
      } catch {
        setUtilisateurSession(null);
      }
    }
    chargerUtilisateurSession();
    window.addEventListener("auth-change", chargerUtilisateurSession);
    return () => window.removeEventListener("auth-change", chargerUtilisateurSession);
  }, [user]);

  useEffect(() => {
    async function chargerNombrePanier() {
      if (!utilisateurActuel) { setNombrePanier(0); return; }
      try {
        const res = await axios.get(`${API_URL}/panier`, { withCredentials: true });
        const panier = Array.isArray(res.data) ? res.data : [];
        const total = panier.reduce((somme, parfum) => somme + Number(parfum.quantite || 0), 0);
        setNombrePanier(total);
      } catch {
        setNombrePanier(0);
      }
    }
    chargerNombrePanier();
    window.addEventListener("panier-change", chargerNombrePanier);
    return () => window.removeEventListener("panier-change", chargerNombrePanier);
  }, [utilisateurActuel]);

  useEffect(() => {
    async function chargerDemandesEnAttente() {
      if (!utilisateurActuel?.admin) { setDemandesEnAttente(0); return; }
      try {
        const res = await axios.get(`${API_URL}/ajout/demandes/en-attente`, { withCredentials: true });
        setDemandesEnAttente(Array.isArray(res.data) ? res.data.length : 0);
      } catch {
        setDemandesEnAttente(0);
      }
    }
    chargerDemandesEnAttente();
    window.addEventListener("demandes-parfum-change", chargerDemandesEnAttente);
    return () => window.removeEventListener("demandes-parfum-change", chargerDemandesEnAttente);
  }, [utilisateurActuel]);

  useEffect(() => {
    if (!utilisateurActuel) { setMessagesNonLus(0); return; }

    axios.get(`${API_URL}/notifications/mes-notifications`, { withCredentials: true })
      .then(res => setMessagesNonLus(Array.isArray(res.data) ? res.data.length : 0))
      .catch(() => setMessagesNonLus(0));

    const sse = new EventSource(`${API_URL}/notifications/notifications-parfums`, { withCredentials: true });
    sse.onmessage = (event) => {
      setMessagesNonLus(prev => prev + 1);
      setAfficherDialogueMessage(true);
      setDerniereNotif(event.data);
    };
    return () => sse.close();
  }, [utilisateurActuel]);

  return (
    <header className="navbarMistify">
      <Link to="/" className="logo">Mistify</Link>

      <nav className="nav-links">
        <Link to="/" className="nav-link">ACCUEIL</Link>
        <Link to="/parfums" className="nav-link">PARFUMS</Link>
        <Link to="/contact" className="nav-link">CONTACT</Link>
        <Link
          to="/demande-admin"
          className="nav-link nav-link-avec-badge"
        > ADMIN
          {utilisateurActuel?.admin && demandesEnAttente > 0 && (
            <span className="notifPanier">{demandesEnAttente}</span>
          )}
        </Link>
      </nav>

      <div className="navbarDroiteActuelle">
        <nav className="nav-links">
          <Link to="/ajout-parfum" className="nav-link">AJOUT PARFUM</Link>
        </nav>

        <div className="nav-icons">
          <Link to="/ajout-parfum" className="nav-link">DEMANDE PARFUM</Link>

          {utilisateurActuel?.admin && (
            <>
              <Link to="/demande-admin" className="nav-link nav-link-avec-badge">
                DEMANDES
                {demandesEnAttente > 0 && <span className="notifPanier">{demandesEnAttente}</span>}
              </Link>
              <Link to="/admin-inventaire" className="nav-link">INVENTAIRE</Link>
            </>
          )}

          <Link to="/panier" className="icon-button" title="Panier">
            <FiShoppingCart />
            {nombrePanier > 0 && <span className="notifPanier">{nombrePanier}</span>}
          </Link>

          <Link
            to="/boite-vocale"
            className="icon-button messages-navbar"
            title="Boite vocale"
          >
            <FiMail />
            {messagesNonLus > 0 && (
              <span className="notifPanier">{messagesNonLus}</span>
            )}
          </Link>

          <Link
            to="/compte"
            className={`icon-button ${utilisateurActuel ? "profil-button" : ""}`}
            title="Compte"
            onClick={onGoToCompte}
          >
            {utilisateurActuel ? (
              <img src={photoProfil} alt="Compte" className="photoProfilNavbar" />
            ) : (
              <FiUser />
            )}
          </Link>
        </div>
      </div>

      {afficherDialogueMessage && messagesNonLus > 0 && (
        <DialoguePersona
          key={messagesNonLus}
          nom="Mistify"
          texte={derniereNotif || "Nouveau parfum correspond à vos préférences !"}
        />
      )}
    </header>
  );
}
