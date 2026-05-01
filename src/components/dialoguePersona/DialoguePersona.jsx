import { useEffect, useState } from "react";
import "./DialoguePersona.css";

export default function DialoguePersona({
  nom = "@yanis26x",
  texte = "Bienvenue sur la page details parfum.",
}) {
  const [visible, setVisible] = useState(true);
  const [nombreLettres, setNombreLettres] = useState(0);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index += 1;
      setNombreLettres(index);

      if (index >= texte.length) {
        clearInterval(interval);
      }
    }, 22);

    return () => clearInterval(interval);
  }, [texte]);

  const texteAffiche = texte.slice(0, nombreLettres);

  if (!visible) {
    return null;
  }

  return (
    <div className="dialoguePersona">
      <button
        className="fermerDialoguePersona"
        onClick={() => setVisible(false)}
      >
        X
      </button>

      <div className="nomDialoguePersona">{nom}</div>

      <p className="texteDialoguePersona">{texteAffiche}</p>
    </div>
  );
}
