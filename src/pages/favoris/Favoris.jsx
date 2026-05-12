import Navbar from "../../components/navbar/Navbar";
import "./Favoris.css";

const imagesFavoris = [
  "/bloodd.png",
  "/Remover.jpeg",
  "/Hello-kitty.webp",
  "/sora.jpg",
  "/vampp.jpeg",
  "/SpotifyLogoRed.webp",
  "/tacheSang.png",
  "/Deathnote.jpg",
  "/frutigerBG.jpg",
];

export default function Favoris() {
  return (
    <div className="pageFavoris">
      <Navbar />

      <section className="sectionFavoris">
        <div className="texteFavoris">
          <h1>𖤐Favoris</h1>
          <p>Page Favoris pas encore fait......</p>
        </div>

        <div className="imagesFavoris">
          {imagesFavoris.map((image) => (
            <img key={image} src={image} alt="Favoriasss" />
          ))}
        </div>
      </section>
    </div>
  );
}
