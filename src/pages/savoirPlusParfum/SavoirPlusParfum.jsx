import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./SavoirPlusParfum.css";

export default function SavoirPlusParfum() {
  const { id } = useParams();
  const navigate = useNavigate();

  const AUTH_API = "http://localhost:3000/auth/whoami";

  const [parfum, setParfum] = useState(null);
  const [commentaires, setCommentaires] = useState([]);
  const [loadingComments, setLoadingComments] = useState(true);

  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [sendingComment, setSendingComment] = useState(false);

  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const [deletingParfum, setDeletingParfum] = useState(false);

  useEffect(() => {
    fetchParfum();
    fetchCommentaires();
    checkUser();
  }, [id]);

  async function checkUser() {
    setLoadingUser(true);

    try {
      const res = await axios.get(AUTH_API, {
        withCredentials: true,
      });
      setUser(res.data);
    } catch (error) {
      setUser(null);
    } finally {
      setLoadingUser(false);
    }
  }

  async function fetchParfum() {
    try {
      const res = await fetch(`http://localhost:3000/parfums/${id}`, {
        credentials: "include",
      });
      const data = await res.json();
      setParfum(data);
    } catch (err) {
      console.log("Erreur parfum");
    }
  }

  async function fetchCommentaires() {
    try {
      setLoadingComments(true);

      const res = await fetch(`http://localhost:3000/parfums/${id}/commentaires`, {
        credentials: "include",
      });
      const data = await res.json();

      if (Array.isArray(data)) {
        setCommentaires(data);
      } else {
        setCommentaires([]);
      }
    } catch (err) {
      console.log("Erreur commentaires");
      setCommentaires([]);
    } finally {
      setLoadingComments(false);
    }
  }

  async function handleAddComment(e) {
    e.preventDefault();

    if (!newComment.trim()) {
      alert("Écris un commentaire.");
      return;
    }

    if (!user) {
      alert("Tu dois être connecté pour commenter.");
      return;
    }

    try {
      setSendingComment(true);

      const bodyData = {
        content: newComment,
        rating: Number(newRating),
        userId: user.id,
      };

      const res = await fetch(`http://localhost:3000/parfums/${id}/commentaires`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(bodyData),
      });

      let data = null;
      try {
        data = await res.json();
      } catch {}

      if (!res.ok) {
        alert(data?.message || "Impossible d'ajouter le commentaire");
        return;
      }

      setNewComment("");
      setNewRating(5);
      await fetchCommentaires();
    } catch (err) {
      console.log("Erreur ajout commentaire");
      alert("Erreur lors de l'ajout du commentaire.");
    } finally {
      setSendingComment(false);
    }
  }

  async function handleDeleteComment(commentId) {
    const confirmDelete = window.confirm(
      "Tu veux vraiment supprimer ce commentaire ?"
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:3000/commentaires/${commentId}`, {
        method: "DELETE",
        credentials: "include",
      });

      let data = null;
      try {
        data = await res.json();
      } catch {}

      if (!res.ok) {
        alert(data?.message || "Impossible de supprimer le commentaire");
        return;
      }

      await fetchCommentaires();
    } catch (err) {
      console.log("Erreur suppression commentaire");
      alert("Erreur lors de la suppression.");
    }
  }

  async function handleDeleteParfum() {
    const confirmDelete = window.confirm(
      "Tu veux vraiment supprimer ce parfum ?"
    );

    if (!confirmDelete) return;

    try {
      setDeletingParfum(true);

      const res = await fetch(`http://localhost:3000/parfums/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      let data = null;
      try {
        data = await res.json();
      } catch {}

      if (!res.ok) {
        alert(data?.message || "Impossible de supprimer le parfum");
        return;
      }

      alert("Parfum supprimé avec succès.");
      navigate("/");
    } catch (err) {
      console.log("Erreur suppression parfum");
      alert("Erreur lors de la suppression du parfum.");
    } finally {
      setDeletingParfum(false);
    }
  }

  if (!parfum || loadingUser) {
    return (
      <div className="parfumPage">
        <button className="back-btn" onClick={() => navigate("/")}>
          ← Retour au menu
        </button>

        <div className="loadingBox">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="parfumPage">
      <button className="back-btn" onClick={() => navigate("/")}>
        ← Retour au menu
      </button>

      <div className="parfumContainer">
        <div className="parfumCard">
          <img
            src={parfum.imageUrl || "/bloodd.png"}
            onError={(e) => (e.target.src = "/bloodd.png")}
            alt={parfum.name}
            className="parfumImage"
          />

          <div className="parfumInfos">
            <h1 className="parfumTitle">{parfum.name}</h1>

            <p className="parfumBrand">{parfum.brand}</p>

            <p className="parfumDesc">
              {parfum.description || "Aucune description disponible."}
            </p>

            <p className="parfumPrice">
              {parfum.price ? `${parfum.price}$` : "Prix non précisé"}
            </p>

            <div className="parfumMeta">
              <div className="metaBox">
                <span className="metaLabel">ID</span>
                <span className="metaValue">{parfum.id}</span>
              </div>

              <div className="metaBox">
                <span className="metaLabel">Marque</span>
                <span className="metaValue">{parfum.brand}</span>
              </div>

              <div className="metaBox">
                <span className="metaLabel">Nombre d’avis</span>
                <span className="metaValue">{commentaires.length}</span>
              </div>

              <div className="metaBox">
                <span className="metaLabel">BTN ajouter au panier</span>
                <span className="metaValue">A FAIRE</span>
              </div>
            </div>

            {user?.admin && (
              <button
                className="deleteParfumBtn"
                onClick={handleDeleteParfum}
                disabled={deletingParfum}
              >
                {deletingParfum ? "Suppression..." : "Supprimer le parfum"}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="commentSection">
        <h2 className="commentTitle">Commentaires</h2>

        {user ? (
          <form className="commentForm" onSubmit={handleAddComment}>
            <h3 className="commentSubtitle">Ajouter un commentaire</h3>

            <textarea
              className="commentTextarea"
              placeholder="Écris ton avis sur ce parfum..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />

            <div className="commentFormBottom">
              <div className="ratingBox">
                <label className="ratingLabel">Note :</label>
                <select
                  className="ratingSelect"
                  value={newRating}
                  onChange={(e) => setNewRating(e.target.value)}
                >
                  <option value={1}>1 / 5</option>
                  <option value={2}>2 / 5</option>
                  <option value={3}>3 / 5</option>
                  <option value={4}>4 / 5</option>
                  <option value={5}>5 / 5</option>
                </select>
              </div>

              <button
                type="submit"
                className="commentButton"
                disabled={sendingComment}
              >
                {sendingComment ? "Envoi..." : "Publier"}
              </button>
            </div>
          </form>
        ) : (
          <p className="commentEmpty">
            Connecte-toi pour ajouter un commentaire.
          </p>
        )}

        {loadingComments ? (
          <p className="commentEmpty">Chargement des commentaires...</p>
        ) : commentaires.length === 0 ? (
          <p className="commentEmpty">Aucun commentaire pour ce parfum.</p>
        ) : (
          <div className="commentList">
            {commentaires.map((commentaire) => (
              <div key={commentaire.id} className="commentCard">
                <div className="commentTop">
                  <div className="commentTopLeft">
                    <span className="commentUser">
                      {commentaire.user?.name || "Utilisateur"}
                    </span>

                    <span className="commentRating">
                      ⭐ {commentaire.rating}/5
                    </span>
                  </div>

                  {user?.admin && (
                    <button
                      className="deleteCommentBtn"
                      onClick={() => handleDeleteComment(commentaire.id)}
                    >
                      Supprimer
                    </button>
                  )}
                </div>

                <p className="commentText">
                  {commentaire.content || "Commentaire vide"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}