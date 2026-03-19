import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./VendreParfum.css";

export default function VendreParfum() {
  const navigate = useNavigate();

  const API = "http://localhost:3000/parfums";

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
        body: JSON.stringify(bodyData),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage("Erreur lors de la création du parfum");
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
      const response = await fetch(API);
      const data = await response.json();

      setParfums(data);
    } catch (error) {
      setMessage("Erreur lors du chargement des parfums");
    }
  }

  async function getOneParfum() {
    setMessage("");

    try {
      const response = await fetch(`${API}/${oneId}`);

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
        body: JSON.stringify({
          price: Number(newPrice),
        }),
      });

      if (!response.ok) {
        setMessage("Erreur lors de la modification");
        return;
      }

      await response.json();
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
      });

      if (!response.ok) {
        setMessage("Erreur lors de la suppression");
        return;
      }

      setMessage("Parfum supprimé avec succès");
      setDeleteId("");
    } catch (error) {
      setMessage("Erreur serveur");
    }
  }

  return (
    <div className="vendrePage">
      <h1>Vendre Parfum</h1>

      <button className="retourBtn" onClick={() => navigate("/")}>
        Retour au menu
      </button>

      <p className="message">{message}</p>

      <div className="section">
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
                <div>
                  <p><strong>Image :</strong></p>
                  <img
                    src={parfum.imageUrl}
                    alt={parfum.name}
                    style={{ width: "120px", borderRadius: "10px" }}
                  />
                </div>
              )}

              <hr />
            </div>
          ))}
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

      <div className="section">
        <h2>Supprimer un parfum</h2>

        <input
          type="number"
          placeholder="ID du parfum"
          value={deleteId}
          onChange={(e) => setDeleteId(e.target.value)}
        />

        <button onClick={deleteParfum}>Supprimer</button>
      </div>
    </div>
  );
}