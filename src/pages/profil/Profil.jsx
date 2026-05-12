import { useNavigate } from "react-router-dom";
import "./Profil.css";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";


export default function Profil() {
  const navigate = useNavigate();

  function compte() {
    navigate("/compte");
  }
return (
	  <div className="profil-page">
	    <Navbar
	            onGoToCompte={() => navigate("/compte")}
	          />

    <div className="container-profil">
      
      <aside className="menuProfil">
        <div className="profile-header">
          <img src="https://i.pinimg.com/474x/b1/48/8f/b1488fdac4488b4a116c6964c1735f60.jpg?nii=t" alt="Jane Doe" />
          <p className="user-name">Jane Doe</p>
          <p className="member-status">Membre Privilège</p>
        </div>

        <div className="sidebar-links">
          <button onClick={compte} className="link-active">Mon Compte</button>
          <button>Ma wishlist</button>
          <button className="logout-btn">Déconnexion</button>
        </div>
      </aside>

     
      <div className="right-section">
        
       
        <section className="card-white espacePerso">
          <div className="card-top-bar">
            <div>
              <span className="label-category">Espace Personnel</span>
              <h1 className="main-title">Mon Profil</h1>
            </div>
            <button className="btn-outline">Modifier</button>
          </div>

          <div className="info-grid">
            <div className="field">
              <label>Nom Complet</label>
              <p>Jane Doe</p>
            </div>
            <div className="field">
              <label>Adresse E-mail</label>
              <p>janedoe@gmail.com</p>
            </div>
            <div className="field full-width">
              <label>Adresse De Livraison Principale</label>
              <p>7000 Rue Marie-Victorin, Montreal Quebec H1G 2J6 </p>
            </div>
          </div>
        </section>

       
        <section className="card-white orderProfil">
          <div className="card-top-bar">
            <p className="section-subtitle">Dernière Commande</p>
            <span className="badge-status">Expédié</span>
          </div>

          <div className="order-item-box">
            <div className="item-info">
              <span className="order-number">COMMANDE #MYST-88291</span>
              <h2 className="brand-name">L'Ombre des Fleurs</h2>
              <p className="product-type">Eau de Parfum - 100ml</p>
            </div>
            <div className="item-pricing">
              <p className="price-tag">175,00$</p>
              <p className="details-link">Détails</p>
            </div>
          </div>
        </section>

        <section className="banner-dark exclusiveProfil">
          <span className="banner-label">Découverte Exclusive</span>
          <h2 className="banner-heading">Inspiré par votre élégance.</h2>
          <p className="banner-description">
            Basé sur votre passion pour les notes boisées, nous avons réservé
            un échantillon de notre nouvelle collection 'Éclat de Nuit' pour
            votre prochaine visite.
          </p>
          <button className="banner-btn">Découvrir la collection</button>
        </section>

      </div>
    </div>
    <Footer />
  </div>
)
}
