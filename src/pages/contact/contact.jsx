import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Contact.css";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { FiPhone, FiMapPin, FiClock } from "react-icons/fi";

export default function Contact() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    type: "DEMANDE_GENERALE",
    message: "",
  });

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

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!formData.nom.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError("Veuillez remplir tous les champs obligatoires");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/contacts",
        formData,
        {
          withCredentials: true,
        }
      );

      setSuccess(true);
      setFormData({
        nom: "",
        email: "",
        type: "DEMANDE_GENERALE",
        message: "",
      });


      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (err) {
      console.error("Erreur envoi formulaire:", err);
      setError("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="contact-page">
      <Navbar user={user} onGoToCompte={() => navigate("/compte")} />


      <div className="contact-hero">
        <h1 className="contact-title">Signalement & Support</h1>
        <p className="contact-subtitle">
          Votre satisfaction est notre signature. Comment pouvons-nous vous aider aujourd'hui ?
        </p>
      </div>

      <div className="contact-container">
        {/* FORMULAIRE */}
        <div className="form-section">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="nom" className="form-label">
                  NOM COMPLET
                </label>
                <input
                  type="text"
                  id="nom"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  placeholder="Votre nom complet"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  ADRESSE EMAIL
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="votre@email.com"
                  className="form-input"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="type" className="form-label">
                TYPE DE DEMANDE
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="form-select"
              >
                <option value="DEMANDE_GENERALE">Demande Générale</option>
                <option value="SIGNALEMENT_PROBLEME">Signalement d'un Problème</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="message" className="form-label">
                MESSAGE
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Décrivez votre demande..."
                className="form-textarea"
                rows="6"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="form-button"
              disabled={loading}
            >
              {loading ? "Envoi en cours..." : "ENVOYER MA DEMANDE"}
            </button>

            <p className="form-note">
              Notre administrateur vous répondra sous un délai de 24 heures ouvrables
            </p>

            {success && (
              <div className="success-message">
                Votre demande a été envoyée avec succès !
              </div>
            )}

            {error && (
              <div className="error-message">
                {error}
              </div>
            )}
          </form>
        </div>

        <div className="info-cards">
          <div className="info-card">
            <div className="info-icon">
              <FiPhone size={32} />
            </div>
            <h3 className="info-title">TÉLÉPHONE</h3>
            <p className="info-content">+1 (514) 555-0199</p>
          </div>

          <div className="info-card">
            <div className="info-icon">
              <FiMapPin size={32} />
            </div>
            <h3 className="info-title">ADRESSE</h3>
            <p className="info-content">Montréal, Canada</p>
          </div>

          <div className="info-card">
            <div className="info-icon">
              <FiClock size={32} />
            </div>
            <h3 className="info-title">HORAIRES</h3>
            <p className="info-content">Lun - Ven | 10h - 19h</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
