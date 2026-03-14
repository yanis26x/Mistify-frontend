import { useNavigate } from "react-router-dom";
import "./home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="homeDiv">

      <button className="BTNcompte" onClick={() => navigate("/auth")}>
        Compte
      </button>

      <section className="heroSection">
        <h1 className="titreHome">Bienvenue sur Mistify</h1>
        <p className="soustitreHome">
          I'm having withdrawals, I feel uneasy <br/>
          Skittles got me feeling tranquil, they're so relieving <br/>
          ughhhh hello...?!
        </p>
      </section>

      <div className="horizonImg">

        <div className="carteImg">
          <img src="/bloodd.png" className="carteParfum"/>
          <p className="cardText">ok..?</p>
        </div>

        <div className="carteImg">
          <img src="/bloodd.png" className="carteParfum"/>
          <p className="cardText">ok..?</p>
        </div>

        <div className="carteImg">
          <img src="/bloodd.png" className="carteParfum"/>
          <p className="cardText">ok..?</p>
        </div>

        <div className="carteImg">
          <img src="/bloodd.png" className="carteParfum"/>
          <p className="cardText">ok..?</p>
        </div>

        <div className="carteImg">
          <img src="/bloodd.png" className="carteParfum"/>
          <p className="cardText">ok..?</p>
        </div>

      </div>

    </div>
  );
}