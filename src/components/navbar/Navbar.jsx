import "./Navbar.css";
import UserStatus from "../userStatus/UserStatus";

export default function Navbar({
  user,
  onGoToCommentaires,
  onChangeTheme,
  onGoToVendre,
  nextBackground,
  onGoToCompte,
}) {
  return (
    <nav className="navbarMistify">
      <div className="navbarLeft">
        <UserStatus user={user} onGoToCompte={onGoToCompte} />
      </div>

      <div className="navbarRight">
        <button className="navBtn" onClick={onGoToCommentaires}>
          <span>Commentaires</span>
        </button>

        <button
          className="navBtn navThemeBtn"
          onClick={onChangeTheme}
          style={{
            backgroundImage: `url(${nextBackground})`,
          }}
        >
          theme
        </button>

        <button className="navBtn" onClick={onGoToVendre}>
          <span>Vendre</span>
        </button>

      </div>
    </nav>
  );
}