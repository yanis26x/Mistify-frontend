// import "./Footer.css";

// export default function Footer() {
//   return (
//     <footer className="footer">
//       <p>© {new Date().getFullYear()} Mistify - all rights reserved</p>
//     </footer>
//   );
// }

import "./Footer.css";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-section">
        <h3 className="footer-logo">MISTIFY</h3>
        <p className="footer-description">
          L'art de la fragrance, redéfini par la passion et l'expertise
          olfactive.
        </p>
      </div>

      <div className="footer-section">
        <h4 className="footer-title">Boutique</h4>
        <ul className="footer-links">
          <li>
            <Link to="/">Accueil</Link>
          </li>
          <li>
            <Link to="/parfums">Parfums</Link>
          </li>
        </ul>
      </div>

      <div className="footer-section">
        <h4 className="footer-title">Compte</h4>
        <ul className="footer-links">
          <li>
            <Link to="/compte">Mon compte</Link>
          </li>
          <li>
            <Link to="/panier">Panier</Link>
          </li>
        </ul>
      </div>

      <div className="footer-section">
        <h4 className="footer-title">Maison</h4>
        <ul className="footer-links">
          <li>
            <Link to="/contact">Aide & Contact</Link>
          </li>
        </ul>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Mistify - all rights reserved</p>
      </div>
    </footer>
  );
}
