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
    async function checkUser() {
      try {
        const res = await axios.get("http://localhost:3000/users/whoami", {
          withCredentials: true,
        });
        setUser(res.data);
      } catch {
        setUser(null);
      }
    }

    checkUser();
  }, []);

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
            <p>Votre satisfaction est notre priorité. N'hésitez pas à nous contacter pour toute question.</p>
          </div>

          <form className="formulaire-contact" onSubmit={envoyerFormulaire}>
            <input type="text" placeholder="Votre nom" />
            <input type="email" placeholder="Votre email" />
            <select defaultValue="">
              <option value="" disabled>
                Raison du message
              </option>
              <option>Signalement</option>
              <option>Comportement inapproprié</option>
              <option>Problème avec ma commande</option>
              <option>Question générale</option>
              <option>Autre</option>
            </select>
            <textarea placeholder="Votre message" rows="4"></textarea>
            <button type="submit">Envoyer</button>
          </form>
        </section>

        <div className="sections-bas">
          <section className="carte-contact">
            <h2>Notre but</h2>
            <p>
              Nous nous engageons à vous offrir une expérience d'exception et à répondre à chacune de vos demandes avec soin.
            </p>
          </section>

          <section className="carte-contact">
            <h2>Nous appeler</h2>

            <div className="coordonnees-contact">
              <div className="coordonnee-contact">
                <FiPhone size={22} />
                <span>1-877-737-4672</span>
              </div>

             <p>Disponible pendant nos heures d'ouverture. Consultez nos disponibilités ci-dessous.</p>
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
          <h2>Nos disponibilités</h2>
          <div className="liste-disponibilites">
            <p>Lundi – Vendredi : 9h00 à 18h00</p>
            <p>Samedi : 10h00 à 15h00</p>
            <p>Dimanche : Fermé</p>
          </div>
        </section>
      </main>

      <Footer />

      {/* <section className="section-cachee" ref={sectionCachee}>
        <p>
          Merci pour votre message. Notre équipe vous répondra dans les plus brefs délais.
        </p>
      </section> */}
    </div>
  );
}
