import { useState } from "react";
import "./CreateAcc.css";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";

export default function CreateAcc({ onSignup, onSignin, message }) {
  const [name, setName] = useState("");
  const [prenom, setPrenom] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  const [signinEmail, setSigninEmail] = useState("");
  const [signinPassword, setSigninPassword] = useState("");

  const [preferences, setPreferences] = useState([]);
  const scentOptions = ["Floral","Chypré","Fougère","Cuir","Boisé", "Oriental","Hespéridé"];

  const [isActive, setIsActive] = useState(false);
  
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

  const handleCheckboxChange = (scent) => { 
    setPreferences((prev) => prev.includes(scent) ? prev.filter((item) => item !== scent) : [...prev, scent]
  )};
  

  return (
    <>
      {/* {message && <p className="msg msg-ok">{message}</p>} */}
      <Navbar/>
      <div className="wrapper">

      <div className="grid">
        <div className="card">
          <h2 className="titre">Créer un compte</h2>
          <h2 className="titre"> Connexion </h2>

          <form onSubmit={handleSubmitSignup} className="form">
            <input
              type="text"
              placeholder="Prénom"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              />
            
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

            <input
              type="password"
              placeholder="......"
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
              />

            <div className="preferences">
              <p className="title"> Préférences Olfactives </p>
              <div className="checkbox">
                {scentOptions.map((scent) => (
                <label key={scent} className="checkbox-item">
                  <input 
                  type="checkbox"
                  checked={preferences.includes(scent)}
                  onChange={() => handleCheckboxChange(scent)}
                  />
                    <span> {scent} </span>
                </label>
                ))}
              </div>
            </div>

            <button type="submit" className="btn-principal">
              Créer un compte
            </button>
          </form>
        </div>

        {/* <div className="card">
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
        </div> */}
      </div>
      </div>
      <Footer/>
    </>
  );
}