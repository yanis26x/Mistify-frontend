import { useState } from "react";
import "./CreateAcc.css";

export default function CreateAcc({ onSignup, onSignin, message }) {
  const [name, setName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  const [signinEmail, setSigninEmail] = useState("");
  const [signinPassword, setSigninPassword] = useState("");

  function fillAdmin() {
    setSigninEmail("yanis26x@hotmail.com");
    setSigninPassword("mdp");
  }

  function fillNoAdmin() {
    setSigninEmail("noAdmin@mail.com");
    setSigninPassword("mdp");
  }

  async function handleSubmitSignup(e) {
    e.preventDefault();

    await onSignup({
      name,
      email: signupEmail,
      password: signupPassword,
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
      {message && <p className="createacc-message createacc-success-message">{message}</p>}

      <div className="createacc-grid-two">
        <div className="createacc-panel">
          <h2 className="createacc-section-title">Créer un compte</h2>

          <form onSubmit={handleSubmitSignup} className="createacc-form-block">
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

            <button type="submit" className="createacc-primary-btn">
              Créer un compte
            </button>
          </form>
        </div>

        <div className="createacc-panel">
          <h2 className="createacc-section-title">Connexion</h2>

          <div className="createacc-quick-buttons">
            <button type="button" className="createacc-secondary-btn" onClick={fillAdmin}>
              Remplir admin
            </button>

            <button
              type="button"
              className="createacc-secondary-btn"
              onClick={fillNoAdmin}
            >
              Remplir user
            </button>
          </div>

          <form onSubmit={handleSubmitSignin} className="createacc-form-block">
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

            <button type="submit" className="createacc-primary-btn">
              Se connecter
            </button>
          </form>
        </div>
      </div>
    </>
  );
}