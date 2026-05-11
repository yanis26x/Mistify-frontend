import "./Navbar.css";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FiUser, FiHeart, FiShoppingCart, FiMail } from "react-icons/fi";
import NavbarRecherche from "../navbarRecherche/NavbarRecherche";
import DialoguePersona from "../dialoguePersona/DialoguePersona";

const API_URL = "http://localhost:3000";

export default function Navbar({
  user,
  onGoToCompte,
}) {
  const [utilisateurSession, setUtilisateurSession] = useState(user || null);
  const utilisateurActuel = user || utilisateurSession;
  const photoProfil = utilisateurActuel?.admin ? "/vampp.jpeg" : "/Hello-kitty.webp";
  const [nombrePanier, setNombrePanier] = useState(0);
  const [messagesNonLus, setMessagesNonLus] = useState(0);
  const [demandesEnAttente, setDemandesEnAttente] = useState(0);
  const [afficherDialogueMessage, setAfficherDialogueMessage] = useState(false);
  const dernierMessageAnnonce = useRef(0);

  useEffect(() => {
    async function chargerUtilisateurSession() {
      if (user) return;

      try {
        const res = await axios.get(`${API_URL}/users/whoami`, {
          withCredentials: true,
        });
        setUtilisateurSession(res.data);
      } catch {
        setUtilisateurSession(null);
      }
    }

    chargerUtilisateurSession();
    window.addEventListener("auth-change", chargerUtilisateurSession);

    return () => {
      window.removeEventListener("auth-change", chargerUtilisateurSession);
    };
  }, [user]);

  useEffect(() => {
    async function chargerNombrePanier() {
      if (!utilisateurActuel) {
        setNombrePanier(0);
        return;
      }

      try {
        const res = await axios.get(`${API_URL}/panier`, {
          withCredentials: true,
        });
        const panier = Array.isArray(res.data) ? res.data : [];
        const total = panier.reduce((somme, parfum) => {
          return somme + Number(parfum.quantite || 0);
        }, 0);
        setNombrePanier(total);
      } catch {
        setNombrePanier(0);
      }
    }

    chargerNombrePanier();
    window.addEventListener("panier-change", chargerNombrePanier);

    return () => {
      window.removeEventListener("panier-change", chargerNombrePanier);
    };
  }, [utilisateurActuel]);

  useEffect(() => {
    async function chargerDemandesEnAttente() {
      if (!utilisateurActuel?.admin) {
        setDemandesEnAttente(0);
        return;
      }

      try {
        const res = await axios.get(`${API_URL}/ajout/demandes/en-attente`, {
          withCredentials: true,
        });
        setDemandesEnAttente(Array.isArray(res.data) ? res.data.length : 0);
      } catch {
        setDemandesEnAttente(0);
      }
    }

    chargerDemandesEnAttente();
    window.addEventListener("demandes-parfum-change", chargerDemandesEnAttente);

    return () => {
      window.removeEventListener("demandes-parfum-change", chargerDemandesEnAttente);
    };
  }, [utilisateurActuel]);

  useEffect(() => {
    async function chargerMessagesNonLus() {
      if (!utilisateurActuel) {
        setMessagesNonLus(0);
        dernierMessageAnnonce.current = 0;
        return;
      }

      try {
        const res = await axios.get(`${API_URL}/notifications/user-notifications`, {
          withCredentials: true,
        });
        const messages = Array.isArray(res.data) ? res.data : [];
        const total = messages.length;
        const dernierMessage = messages.reduce((plusGrandId, message) => {
          return Math.max(plusGrandId, Number(message.id) || 0);
        }, 0);
        const cleStockage = `dernier-message-annonce-${utilisateurActuel.id}`;
        const dernierMessageStocke = Number(localStorage.getItem(cleStockage)) || 0;

        if (dernierMessage > dernierMessageStocke) {
          setAfficherDialogueMessage(true);
          localStorage.setItem(cleStockage, String(dernierMessage));
        }

        dernierMessageAnnonce.current = dernierMessage;
        setMessagesNonLus(total);
      } catch {
        setMessagesNonLus(0);
      }
    }

    chargerMessagesNonLus();
    window.addEventListener("boite-vocale-change", chargerMessagesNonLus);

    return () => {
      window.removeEventListener("boite-vocale-change", chargerMessagesNonLus);
    };
  }, [utilisateurActuel]);

  return (
    <header className="navbarMistify">
      <Link to="/" className="logo">
        <img src="/SpotifyLogoRed.webp" alt="" className="logoImage" />
        Mistify
      </Link>

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
      <NavbarRecherche />

      <div className="navbarDroiteActuelle">
        <nav className="nav-links">
          <Link to="/ajout-parfum" className="nav-link">AJOUT PARFUM</Link>
        </nav>

        <div className="nav-icons">
          <Link to="/favoris" className="icon-button" title="Favoris">
            <FiHeart />
          </Link>

          <Link to="/panier" className="icon-button panier-icon" title="Panier">
            <FiShoppingCart />
            {nombrePanier > 0 && (
              <span className="notifPanier">{nombrePanier}</span>
            )}
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
          nom="@yanis26x"
          texte="nouveau message dans la boite voale....!"
        />
      )}
    </header>
  );
}
