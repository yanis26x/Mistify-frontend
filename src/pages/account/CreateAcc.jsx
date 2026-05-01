import { useState } from "react";
import "./CreateAcc.css";

export default function CreateAcc({ onSignup, onSignin, message }) {
  const [name, setName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  const [signinEmail, setSigninEmail] = useState("");
  const [signinPassword, setSigninPassword] = useState("");

  function autoAdmin() {
    setSigninEmail("yanis26x@hotmail.com");
    setSigninPassword("mdp");
  }

  function autoNormal() {
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
      {message && <p className="msg msg-ok">{message}</p>}

      <div className="grid">
        <div className="card">
          <h2 className="titre">Créer un compte</h2>

          <form onSubmit={handleSubmitSignup} className="form">
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

            <button type="submit" className="btn-principal">
              Créer un compte
            </button>
          </form>
        </div>

        <div className="card">
          <h2 className="titre">Connexion</h2>

          <div className="btn-rapide">
            <button type="button" className="btn-secondaire" onClick={autoAdmin}>
              Admin
            </button>

            <button type="button" className="btn-secondaire" onClick={autoNormal}>
              User
            </button>
          </div>

          <form onSubmit={handleSubmitSignin} className="form">
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

            <button type="submit" className="btn-principal">
              Se connecter
            </button>
          </form>
        </div>
      </div>
    </>
  );
}