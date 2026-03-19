import { useState } from "react";
import "./Logged.css";

export default function Logged({
  user,
  users,
  message,
  onRefreshUser,
  onSignout,
  onGetAllUsers,
  onDeleteUser,
  onDeleteAllUsers,
}) {
  const [deleteUserId, setDeleteUserId] = useState("");

  function handleDeleteClick() {
    onDeleteUser(deleteUserId);
    setDeleteUserId("");
  }

  return (
    <>
      <div className="logged-topbar">
        <div className="logged-user-mini">
         <img
  src={
    user.admin
      ? user.profileImage || "/Hello-kitty.webp"
      : "/loginPfp.jpeg"
  }
  alt="Photo de profil"
  className="logged-avatar"
/>

          <div className="logged-user-texts">
            <p className="logged-mini-text">
              Connecté en tant que <strong>{user.name}</strong>
            </p>

            <p className={`logged-role-badge ${user.admin ? "admin" : "user"}`}>
              {user.admin ? "ADMIN" : "UTILISATEUR"}
            </p>
          </div>
        </div>

        <button className="logged-danger-btn logged-top-logout" onClick={onSignout}>
          Se déconnecter
        </button>
      </div>

      {message && <p className="logged-message logged-success-message">{message}</p>}

      <div className="logged-panel">
        <h2 className="logged-section-title">Session</h2>

        <div className="logged-quick-buttons">
          <button className="logged-primary-btn" onClick={onRefreshUser}>
            Actualiser la session
          </button>
        </div>

        <pre className="logged-json-box">
          {JSON.stringify(user, null, 2)}
        </pre>
      </div>

      <div className="logged-panel">
        <h2 className="logged-section-title">Administration</h2>

        <div className="logged-quick-buttons">
          <button className="logged-primary-btn" onClick={onGetAllUsers}>
            Voir tous les users
          </button>
          <button className="logged-danger-btn" onClick={onDeleteAllUsers}>
            Supprimer tous les users
          </button>
        </div>

        <div className="logged-delete-row">
          <input
            type="number"
            placeholder="ID du user à supprimer"
            value={deleteUserId}
            onChange={(e) => setDeleteUserId(e.target.value)}
          />
          <button className="logged-danger-btn" onClick={handleDeleteClick}>
            Supprimer
          </button>
        </div>

        <pre className="logged-json-box">
          {users.length > 0
            ? JSON.stringify(users, null, 2)
            : "Aucun user chargé"}
        </pre>
      </div>
    </>
  );
}