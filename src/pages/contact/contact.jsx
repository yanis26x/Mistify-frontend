import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./contact.css";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { FiPhone } from "react-icons/fi";

export default function Contact() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const sectionCachee = useRef(null);

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    try {
      const res = await axios.get("http://localhost:3000/auth/whoami", {
        withCredentials: true,
      });
      setUser(res.data);
    } catch (error) {
      setUser(null);
    }
  }

  function envoyerFormulaire(e) {
    e.preventDefault();
    sectionCachee.current.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="page-contact">
      <Navbar user={user} onGoToCompte={() => navigate("/compte")} />

      <main className="conteneur-contact">
        <section className="haut-contact">
          <div className="texte-aide">
            <h1>Vous avez besoin d'aide?</h1>
            <h2>Vous voulez faire un signalement ou nous envoyer un message?</h2>
            <p>Et n'oubliez pas que chez Mistify, votre satifaction est loin detre notre prioriter</p>
          </div>

          <form className="formulaire-contact" onSubmit={envoyerFormulaire}>
            <input type="text" placeholder="Votre nom" />
            <input type="email" placeholder="Votre email" />
            <select defaultValue="">
              <option value="" disabled>
                Raison du message
              </option>
              <option>Signalement</option>
              <option>Insulte</option>
              <option>Probleme avec ma commande</option>
            </select>
            <textarea placeholder="Votre message" rows="4"></textarea>
            <button type="submit">Envoyer</button>
          </form>
        </section>

        <div className="sections-bas">
          <section className="carte-contact">
            <h2>Notre but</h2>
            <p>
              Notre but n'est pas de faire votre bonheur mais juste de passer le cours.
            </p>
          </section>

          <section className="carte-contact">
            <h2>Nous appeler</h2>

            <div className="coordonnees-contact">
              <div className="coordonnee-contact">
                <FiPhone size={22} />
                <span>1-877-737-4672</span>
              </div>

             <p>Numéro surtaxé, vérifiez nos disponibilités avant d’appeler dans le vide.</p>
            </div>
          </section>

          <section className="carte-contact">
            <h2>Les créateurs</h2>

            <div className="liste-createurs">
              <div className="personne-createur">
                <strong>@rym31</strong>
                <span>Aicha-Rym Souane</span>
              </div>

              <div className="personne-createur">
                <strong>@el24s</strong>
                <span>Ellyn Saint-Firmin</span>
              </div>

              <div className="personne-createur">
                <strong>@yanis26x</strong>
                <span>yanis djenadi</span>
              </div>
            </div>
          </section>
        </div>

        <section className="disponibilites">
          <h2>Nos disponibilites</h2>
          <div className="liste-disponibilites">
            <p>Lundi : indisponible</p>
            <p>Mardi : indisponible</p>
            <p>Mercredi : 22h a 22h25</p>
            <p>Jeudi : indisponible</p>
            <p>Vendredi : indisponible</p>
            <p>Samedi : indisponible</p>
            <p>Dimanche : indisponible</p>
          </div>
        </section>
      </main>

      <Footer />

      <section className="section-cachee" ref={sectionCachee}>
        <p>
          T'a vraiment cru que c'etait un vrais formulaire qui aller s'envoyer ?!!?
          garde la peche, oublie pas qu'on rembourse rien.
        </p>
      </section>
    </div>
  );
}
