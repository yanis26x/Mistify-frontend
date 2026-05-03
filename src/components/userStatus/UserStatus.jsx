import "./UserStatus.css";

export default function UserStatus({ user, onGoToCompte }) {
  return (
    <div className="userStatut" onClick={onGoToCompte}>
      {user ? (
        <>
         <img
  src={
    user.admin
      ? user.profileImage || "/Hello-kitty.webp"
      : "/loginPfp.jpeg"
  }
  alt="Photo de profil"
  className="logged-avatar" //??????
/>
          <span className="userText online">
            {user.name} is online 
          </span>
        </>
      ) : (
        <span className="userText offline">
          Crée un compte ou connecte-toi
        </span>
      )}
    </div>
  );
}