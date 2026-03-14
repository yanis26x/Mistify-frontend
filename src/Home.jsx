import { useNavigate } from "react-router-dom";
import "./home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Home</h1>

      <button onClick={() => navigate("/auth")}>
        Compte
      </button>
    </div>
  );
}