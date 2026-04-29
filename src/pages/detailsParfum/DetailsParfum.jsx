import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./DetailsParfum.css";

const BACKEND_URL = "http://localhost:3000";

const BACKEND_URL = "http://localhost:3000";

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

  const [showEditForm, setShowEditForm] = useState(false);
  const [updatingParfum, setUpdatingParfum] = useState(false);

  const [editName, setEditName] = useState("");
  const [editBrand, setEditBrand] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editImageUrl, setEditImageUrl] = useState("");
  const [editPrice, setEditPrice] = useState("");

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
      setEditName("");
      setEditBrand("");
      setEditDescription("");
      setEditImageUrl("");
      setEditPrice("");
    } catch (err) {
      console.log("Erreur parfum");
    }
  }


  function ajouterAuPanier() {
  let panier = JSON.parse(localStorage.getItem("panier")) || [];

  const deja = panier.find((item) => item.id === parfum.id);

  if (deja) {
    deja.quantite += 1;
  } else {
    panier.push({
      id: parfum.id,
      name: parfum.name,
      price: parfum.price,
      imageUrl: parfum.imageUrl,
      quantite: 1,
    });
  }

  localStorage.setItem("panier", JSON.stringify(panier));

  alert("Ajouté au panier !");
}

  async function fetchCommentaires() {
    try {
      setLoadingComments(true);

      const res = await fetch(
        `http://localhost:3000/parfums/${id}/commentaires`,
        {
          credentials: "include",
        }
      );
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

      const res = await fetch(
        `http://localhost:3000/parfums/${id}/commentaires`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(bodyData),
        }
      );

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

  async function handleUpdateParfum(e) {
    e.preventDefault();

    try {
      setUpdatingParfum(true);

      const bodyData = {};

      if (editName.trim() !== "") bodyData.name = editName;
      if (editBrand.trim() !== "") bodyData.brand = editBrand;
      if (editPrice !== "") bodyData.price = Number(editPrice);

      if (editDescription !== "") bodyData.description = editDescription;
      if (editImageUrl !== "") bodyData.imageUrl = editImageUrl;

      if (Object.keys(bodyData).length === 0) {
        alert("ta rien changer, tes serieux....?!");
        return;
      }

      const res = await fetch(`http://localhost:3000/parfums/${id}`, {
        method: "PATCH",
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
        alert(data?.message || "peut pas modifier le parfum....");
        return;
      }

      setParfum(data);
      setShowEditForm(false);

      setEditName("");
      setEditBrand("");
      setEditDescription("");
      setEditImageUrl("");
      setEditPrice("");

      alert("Parfum modifié c'est bon !");
    } catch (err) {
      console.log("Erreur lors de la modification du parfum......");
      alert("Erreur lors de la modification....");
    } finally {
      setUpdatingParfum(false);
    }
  }

  if (!parfum || loadingUser) {
    return (
      <div className="parfum">
        <button className="BTNretour" onClick={() => navigate("/")}>
          ← Retour au menu
        </button>

        <div className="loadingBox">Chargement...!</div>
      </div>
    );
  }

  return (
    <div className="parfum">
      <button className="BTNretour" onClick={() => navigate("/")}>
        ← Retour au menu
      </button>

      <div className="parfum1">
        <div className="parfumCard">
          <img
            src={parfum.imageUrl ? `${BACKEND_URL}${parfum.imageUrl}` : "/bloodd.png"}
            onError={(e) => (e.target.src = "/bloodd.png")}
            alt={parfum.name}
            className="parfumImage"
          />

          <div className="parfumInfos">
            <h1 className="parfumTitre">{parfum.name}</h1>
            <p className="parfumMarque">{parfum.brand}</p>
            <p className="parfumDesc">
              {parfum.description || "Aucune description disponible."}
            </p>
            <p className="parfumPrix">{parfum.price}$</p>

            <div className="parfumMiniInfo">
              <div className="miniInfoBox">
                <span className="miniInfoTitre">ID</span>
                <span className="miniInfoVal">{parfum.id}</span>
              </div>

              <div className="miniInfoBox">
                <span className="miniInfoTitre">Marque</span>
                <span className="miniInfoVal">{parfum.brand}</span>
              </div>

              <div className="miniInfoBox">
                <span className="miniInfoTitre">Prix</span>
                <span className="miniInfoVal">{parfum.price}$</span>
              </div>


              <button className="ajouterPanierBtn" onClick={ajouterAuPanier}>
  Ajouter au panier
</button>

              <div className="miniInfoBox">
                <span className="miniInfoTitre">Commentaires</span>
                <span className="miniInfoVal">{commentaires.length}</span>
              </div>
            </div>

            {user?.admin && (
              <div className="adminActions">
                <button
                  className="editParfumBtn"
                  onClick={() => setShowEditForm(!showEditForm)}
                >
                  {showEditForm
                    ? "Fermer la modification"
                    : "Modifier le parfum"}
                </button>

                <button
                  className="deleteParfumBtn"
                  onClick={handleDeleteParfum}
                  disabled={deletingParfum}
                >
                  {deletingParfum ? "Suppression..." : "Supprimer le parfum"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {user?.admin && showEditForm && (
        <div className="editParfumSection">
          <h2 className="editParfumTitre">Modifier les infos du parfum</h2>

          <form className="editParfumForm" onSubmit={handleUpdateParfum}>
            <input
              type="text"
              className="editInput"
              placeholder={parfum.name || "Nom"}
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />

            <input
              type="text"
              className="editInput"
              placeholder={parfum.brand || "Marque"}
              value={editBrand}
              onChange={(e) => setEditBrand(e.target.value)}
            />

            <input
              type="text"
              className="editInput"
              placeholder={parfum.imageUrl || "Image URL"}
              value={editImageUrl}
              onChange={(e) => setEditImageUrl(e.target.value)}
            />

            <input
              type="number"
              className="editInput"
              placeholder={String(parfum.price ?? "")}
              value={editPrice}
              onChange={(e) => setEditPrice(e.target.value)}
            />

            <textarea
              className="editTextarea"
              placeholder={parfum.description || "Description"}
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
            />

            <button
              type="submit"
              className="sauvgarderModifBTN"
              disabled={updatingParfum}
            >
              {updatingParfum
                ? "Modification..."
                : "Enregistrer les modifications"}
            </button>
          </form>
        </div>
      )}

      <div className="commentSection">
        <h2 className="commentTitre">Commentaires</h2>

        {user ? (
          <form className="commentForm" onSubmit={handleAddComment}>
            <h3 className="commentSousTitre">Ajouter un commentaire</h3>

            <textarea
              className="commentSectionInput"
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
          <p className="connecteToiprComment">
            Connecte-toi pour ajouter un commentaire!
          </p>
        )}

        {loadingComments ? (
          <p className="connecteToiprComment">Chargement des commentaires...</p>
        ) : commentaires.length === 0 ? (
          <p className="connecteToiprComment">Aucun commentaire pour ce parfum.</p>
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