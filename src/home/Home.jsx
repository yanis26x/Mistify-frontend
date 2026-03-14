import { useNavigate } from "react-router-dom";
import "./home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="homeDiv">


      <button className="BTNvendreTop" onClick={() => navigate("/vendreParfum")}>
  <span>Vendre</span>
</button>


<button className="BTNcompte" onClick={() => navigate("/auth")}>
  <span>Compte</span>
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



<section className="vendreSection">
  <h2 className="titreVendre">Vendez vos parfums sur Mistify !</h2>
  <p className="texteVendre">
    Vous avez un parfum que vous n’utilisez plus!? (ou vous manquez vraiment d'argent...) 
    Sur Mistify, vous pouvez facilement vendre vos parfums et les partager avec d'autres passionnés!
  </p>
  <button
    className="BTNvendre"
    onClick={() => navigate("/vendreParfum")}
  >
    Vendre un parfum
  </button>

</section>

    </div>
  );
}