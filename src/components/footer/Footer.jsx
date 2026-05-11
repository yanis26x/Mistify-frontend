import "./Footer.css";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-section">
        <h3 className="footer-logo">MISTIFY</h3>
        <p className="footer-description">
          L'art de la fragrance, redéfini par la passion et l'expertise olfactive.
        </p>
      </div>

      <div className="footer-section">
        <h4 className="footer-title">Navigation</h4>
        <ul className="footer-links">
          <li><Link to="/">Accueil</Link></li>
          <li><Link to="/parfums">Parfums</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </div>

      <div className="footer-section">
        <h4 className="footer-title">Mon Compte</h4>
        <ul className="footer-links">
          <li><Link to="/compte">Connexion / Inscription</Link></li>
          <li><Link to="/profil">Profil</Link></li>
          <li><Link to="/panier">Panier</Link></li>
          <li><Link to="/payment">Paiement</Link></li>
          <li><Link to="/boite-vocale">Mes Notifications</Link></li>
        </ul>
      </div>

      <div className="footer-section">
        <h4 className="footer-title">Services</h4>
        <ul className="footer-links">
          <li><Link to="/ajout-parfum">Demande de parfum</Link></li>
          <li><Link to="/contact">Signalement & Contact</Link></li>
        </ul>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Mistify - all rights reserved</p>
      </div>
    </footer>
  );
}
