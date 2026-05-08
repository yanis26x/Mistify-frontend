import { useState } from "react";
import "./CreateAcc.css";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";

export default function CreateAcc({ onSignup, onSignin, message }) {
  const [name, setName] = useState("");
  const [prenom, setPrenom] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [preferencesOlfactives, setPreferencesOlfactives] = useState("");

  const [signinEmail, setSigninEmail] = useState("");
  const [signinPassword, setSigninPassword] = useState("");

  async function handleSubmitSignup(e) {
    e.preventDefault();

    if (signupPassword !== confirmPassword) {
      alert("Les mots de passe ne sont pas identiques.");
      return;
    }

    await onSignup({
      name: `${prenom} ${name}`.trim(),
      email: signupEmail,
      password: signupPassword,
      preferencesOlfactives,
    });
  }

  async function handleSubmitSignin(e) {
    e.preventDefault();

    await onSignin({
      email: signinEmail,
      password: signinPassword,
    });
  }

  return (
    <>
      <Navbar />

      <main className="account-page">
        <div className="account-box">
          <div className="account-image"></div>

          <div className="account-forms">
            {message && <p className="account-message">{message}</p>}

            <section className="account-card">
              <h2 className="titre">Créer un compte</h2>

              <form onSubmit={handleSubmitSignup} className="form">
                <input
                  type="text"
                  placeholder="Prénom"
                  value={prenom}
                  onChange={(e) => setPrenom(e.target.value)}
                  required
                />

                <input
                  type="text"
                  placeholder="Nom"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />

                <input
                  type="email"
                  placeholder="Email"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  required
                />

                <input
                  type="password"
                  placeholder="Mot de passe"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  required
                />

                <input
                  type="password"
                  placeholder="Confirmer le mot de passe"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />

                <select
                  value={preferencesOlfactives}
                  onChange={(e) => setPreferencesOlfactives(e.target.value)}
                  required
                >
                  <option value="">Préférence olfactive</option>
                  <option value="Frais">Frais</option>
                  <option value="Sucré">Sucré</option>
                  <option value="Boisé">Boisé</option>
                  <option value="Épicé">Épicé</option>
                </select>

                <button type="submit" className="btn-principal">
                  Créer un compte
                </button>
              </form>
            </section>

            <section className="account-card">
              <h2 className="titre">Connexion</h2>

              <form onSubmit={handleSubmitSignin} className="form">
                <input
                  type="email"
                  placeholder="Email"
                  value={signinEmail}
                  onChange={(e) => setSigninEmail(e.target.value)}
                  required
                />

                <input
                  type="password"
                  placeholder="Mot de passe"
                  value={signinPassword}
                  onChange={(e) => setSigninPassword(e.target.value)}
                  required
                />

                <button type="submit" className="btn-principal">
                  Se connecter
                </button>
              </form>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
