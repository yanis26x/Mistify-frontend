import { useEffect, useState } from "react";
import "./FauxCommentaires.css";

const commentaires = [
    {
    nom: "Sara Aissat",
    photo: "/antagonist.png",
    texte: "C'est le meilleur projet que jai vue de toute ma carriere de prof, wow!",
  },
  {
    nom: "Nassim",
    photo: "/Hello-kitty.webp",
    texte: "RENDEZ MOI MON ARGENT !!",
  },
  {
    nom: "Alucard",
    photo: "/vampp.jpeg",
    texte: "ca fait 9 mois que j'attends mon colis.....",
  },
  {
    nom: "Sora",
    photo: "/sora.jpg",
    texte: "C'est le pire site que j'ai vue de ma vie, jespere quil va fermer bientot!",
  },
  {
    nom: "Light",
    photo: "/Deathnote.jpg",
    texte: "ughh...?",
  },
];

function choisirIndexAleatoire(indexActuel) {
  if (commentaires.length <= 1) return 0;

  let nouvelIndex = Math.floor(Math.random() * commentaires.length);

  while (nouvelIndex === indexActuel) {
    nouvelIndex = Math.floor(Math.random() * commentaires.length);
  }

  return nouvelIndex;
}

export default function FauxCommentaires() {
  const [indexCommentaire, setIndexCommentaire] = useState(0);
  const commentaire = commentaires[indexCommentaire];

  useEffect(() => {
    const intervalle = setInterval(() => {
      setIndexCommentaire((indexActuel) => choisirIndexAleatoire(indexActuel));
    }, 5000);

    return () => clearInterval(intervalle);
  }, []);

  return (
    <section className="fauxCommentaires">
      <h2>COMMENTAIRES DE CLIENTS SATISFAITS𖤐</h2>

      <article className="carteFauxCommentaire">
        <img src={commentaire.photo} alt={commentaire.nom} />

        <div>
          <h3>{commentaire.nom}</h3>
          <p>{commentaire.texte}</p>
        </div>
      </article>
    </section>
  );
}
