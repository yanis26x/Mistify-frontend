import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Commentaire.css";

export default function Commentaire() {
  const navigate = useNavigate();

  const [parfumId, setParfumId] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState("");
  const [userId, setUserId] = useState("");

  const [commentaires, setCommentaires] = useState([]);
  const [getParfumId, setGetParfumId] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [message, setMessage] = useState("");

  async function createCommentaire() {
    setMessage("");

    try {
      const response = await fetch(`http://localhost:3000/parfums/${parfumId}/commentaires`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",},
        body: JSON.stringify({
          content: content,
          rating: Number(rating),
          userId: Number(userId),
        }),
      });

      if (!response.ok) {
        setMessage("Erreur lors de la création du commentaire");
        return;
      }

      const data = await response.json();
      setMessage("Commentaire ajouté avec succès");

      setParfumId("");
      setContent("");
      setRating("");
      setUserId("");
    } catch (error) {
      setMessage("Erreur serveur");
    }
  }

  async function getCommentaires() {
    setMessage("");

    try {
      const response = await fetch(`http://localhost:3000/parfums/${getParfumId}/commentaires`);

      if (!response.ok) {
        setMessage("Erreur lors du chargement des commentaires");
        setCommentaires([]);
        return;
      }

      const data = await response.json();
      setCommentaires(data);
    } catch (error) {
      setMessage("Erreur serveur");
    }
  }

  async function deleteCommentaire() {
    setMessage("");

    try {
      const response = await fetch(`http://localhost:3000/commentaires/${deleteId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        setMessage("Erreur lors de la suppression");
        return;
      }

      setMessage("Commentaire supprimé avec succès");
      setDeleteId("");
    } catch (error) {
      setMessage("Erreur serveur");
    }
  }

  return (
    <div className="commentairePage">
      <button className="retourBtnCom" onClick={() => navigate("/")}>
        Retour au menu
      </button>

      <h1>Commentaire</h1>

      <p className="messageCom">{message}</p>

      <div className="sectionCom">
        <h2>Créer un commentaire</h2>

        <input
          type="number"
          placeholder="ID du parfum"
          value={parfumId}
          onChange={(e) => setParfumId(e.target.value)}
        />

        <input
          type="text"
          placeholder="Contenu"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <input
          type="number"
          placeholder="Note / rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        <input
          type="number"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />

        <button onClick={createCommentaire}>Ajouter commentaire</button>
      </div>

      <div className="sectionCom">
        <h2>Voir les commentaires d’un parfum</h2>

        <input
          type="number"
          placeholder="ID du parfum"
          value={getParfumId}
          onChange={(e) => setGetParfumId(e.target.value)}
        />

        <button onClick={getCommentaires}>Charger commentaires</button>

        <div className="resultBoxCom">
          {commentaires.map((commentaire) => (
            <div key={commentaire.id} className="commentaireItem">
              <p><strong>ID :</strong> {commentaire.id}</p>
              <p><strong>Contenu :</strong> {commentaire.content}</p>
              <p><strong>Note :</strong> {commentaire.rating}</p>
              <p><strong>User ID :</strong> {commentaire.userId}</p>
              <hr />
            </div>
          ))}
        </div>
      </div>

      <div className="sectionCom">
        <h2>Supprimer un commentaire</h2>

        <input
          type="number"
          placeholder="ID du commentaire"
          value={deleteId}
          onChange={(e) => setDeleteId(e.target.value)}
        />

        <button onClick={deleteCommentaire}>Supprimer commentaire</button>
      </div>
    </div>
  );
}