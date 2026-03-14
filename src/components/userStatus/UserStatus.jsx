import "./UserStatus.css";

export default function UserStatus({ user }) {
  return (
    <div className="userStatus">
      {user ? (
        <span>{user.name} is online</span>
      ) : (
        <span>
          crée un compte ou connecte toi pour ne pas mourir, clique sur le bouton compte
        </span>
      )}
    </div>
  );
}