import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./VendreParfum.css";

export default function VendreParfum() {
  const navigate = useNavigate();

  const API = "http://localhost:3000/parfums";
  const AUTH_API = "http://localhost:3000/auth/whoami";

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [parfums, setParfums] = useState([]);
  const [oneId, setOneId] = useState("");
  const [oneParfum, setOneParfum] = useState(null);

  const [updateId, setUpdateId] = useState("");
  const [newPrice, setNewPrice] = useState("");

  const [deleteId, setDeleteId] = useState("");

  const [message, setMessage] = useState("");

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    setLoading(true);

    try {
      const res = await axios.get(AUTH_API, {
        withCredentials: true,
      });
      setUser(res.data);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  async function createParfum() {
    setMessage("");

    try {
      const bodyData = {
        name: name,
        brand: brand,
        price: price ? Number(price) : undefined,
        imageUrl: imageUrl.trim() || undefined,
      };

      const response = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(bodyData),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data?.message || "Erreur lors de la création du parfum");
        return;
      }

      setMessage("Parfum ajouté avec succès");
      setName("");
      setBrand("");
      setPrice("");
      setImageUrl("");
    } catch (error) {
      setMessage("Erreur serveur");
    }
  }

  async function getAllParfums() {
    setMessage("");

    try {
      const response = await fetch(API, {
        credentials: "include",
      });
      const data = await response.json();

      if (!response.ok) {
        setMessage("Erreur lors du chargement des parfums");
        return;
      }

      setParfums(data);
    } catch (error) {
      setMessage("Erreur lors du chargement des parfums");
    }
  }

  async function getOneParfum() {
    setMessage("");

    try {
      const response = await fetch(`${API}/${oneId}`, {
        credentials: "include",
      });

      if (!response.ok) {
        setMessage("Parfum introuvable");
        setOneParfum(null);
        return;
      }

      const data = await response.json();
      setOneParfum(data);
    } catch (error) {
      setMessage("Erreur lors de la recherche");
    }
  }

  async function updateParfum() {
    setMessage("");

    try {
      const response = await fetch(`${API}/${updateId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          price: Number(newPrice),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data?.message || "Erreur lors de la modification");
        return;
      }

      setMessage("Prix modifié avec succès");
      setUpdateId("");
      setNewPrice("");
    } catch (error) {
      setMessage("Erreur serveur");
    }
  }

  async function deleteParfum() {
    setMessage("");

    try {
      const response = await fetch(`${API}/${deleteId}`, {
        method: "DELETE",
        credentials: "include",
      });

      let data = null;
      try {
        data = await response.json();
      } catch {}

      if (!response.ok) {
        setMessage(data?.message || "Erreur lors de la suppression");
        return;
      }

      setMessage("Parfum supprimé avec succès");
      setDeleteId("");
    } catch (error) {
      setMessage("Erreur serveur");
    }
  }

  if (loading) {
    return (
      <div className="vendrePage">
        <button className="retourBtn" onClick={() => navigate("/")}>
          ← Retour
        </button>

        <div className="accessCard">
          <h1>Chargement...</h1>
          <p>Vérification de la session en cours.</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="vendrePage">
        <button className="retourBtn" onClick={() => navigate("/")}>
          ← Retour
        </button>


        <div className="accessCard">
          <h1>Accès refusé</h1>
          <p>
            Tu dois créer un compte ou te connecter pour accéder à cette page.
          </p>

          <button className="mainActionBtn" onClick={() => navigate("/compte")}>
            Aller à la page Compte
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="vendrePage">
      <button className="retourBtn" onClick={() => navigate("/")}>
        ← Retour
      </button>

      <div className="pageHeader">
        <h1>Vendre un parfum</h1>
        <p className="pageSubtitle">
          {user.admin
            ? "Mode admin : accès complet à la gestion des parfums."
            : "Tu peux ajouter un parfum à la collection Mistify."}
        </p>
      </div>

      {message && <p className="message">{message}</p>}

      <div className="section createSection">
        <h2>Créer un parfum</h2>

        <input
          type="text"
          placeholder="Nom"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Marque"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />

        <input
          type="number"
          placeholder="Prix"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          type="text"
          placeholder="URL de l'image (optionnelle)"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        <button onClick={createParfum}>Ajouter</button>
      </div>

      {user.admin && (
        <>
          <div className="section">
            <h2>Voir tous les parfums</h2>
            <button onClick={getAllParfums}>Charger les parfums</button>

            <div className="resultBox">
              {parfums.map((parfum) => (
                <div key={parfum.id} className="parfumItem">
                  <p><strong>ID :</strong> {parfum.id}</p>
                  <p><strong>Nom :</strong> {parfum.name}</p>
                  <p><strong>Marque :</strong> {parfum.brand}</p>
                  <p><strong>Prix :</strong> {parfum.price}$</p>

                  {parfum.imageUrl && (
                    <div className="imageBox">
                      <img
                        src={parfum.imageUrl}
                        alt={parfum.name}
                        className="parfumPreview"
                        onError={(e) => (e.target.src = "/bloodd.png")}
                      />
                    </div>
                  )}

                  <hr />
                </div>
              ))}
            </div>
          </div>

          <div className="section">
            <h2>Voir un parfum</h2>

            <input
              type="number"
              placeholder="ID du parfum"
              value={oneId}
              onChange={(e) => setOneId(e.target.value)}
            />

            <button onClick={getOneParfum}>Chercher</button>

            <div className="resultBox">
              {oneParfum && (
                <div className="parfumItem">
                  <p><strong>ID :</strong> {oneParfum.id}</p>
                  <p><strong>Nom :</strong> {oneParfum.name}</p>
                  <p><strong>Marque :</strong> {oneParfum.brand}</p>
                  <p><strong>Prix :</strong> {oneParfum.price}$</p>

                  {oneParfum.imageUrl && (
                    <div className="imageBox">
                      <img
                        src={oneParfum.imageUrl}
                        alt={oneParfum.name}
                        className="parfumPreview"
                        onError={(e) => (e.target.src = "/bloodd.png")}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="section">
            <h2>Modifier le prix d’un parfum</h2>

            <input
              type="number"
              placeholder="ID du parfum"
              value={updateId}
              onChange={(e) => setUpdateId(e.target.value)}
            />

            <input
              type="number"
              placeholder="Nouveau prix"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
            />

            <button onClick={updateParfum}>Modifier</button>
          </div>

          <div className="section deleteSection">
            <h2>Supprimer un parfum</h2>

            <input
              type="number"
              placeholder="ID du parfum"
              value={deleteId}
              onChange={(e) => setDeleteId(e.target.value)}
            />

            <button onClick={deleteParfum}>Supprimer</button>
          </div>
        </>
      )}
    </div>
  );
}