import { useEffect, useState } from "react";
import "./Stat.css";

export default function Stat() {
  const [parfumCount, setParfumCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [adminCount, setAdminCount] = useState(0);
  const [averagePrice, setAveragePrice] = useState(0);

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    try {
      const parfumRes = await fetch("http://localhost:3000/parfums");
      const parfums = await parfumRes.json();

      setParfumCount(parfums.length);

      if (parfums.length > 0) {
        const totalPrice = parfums.reduce((sum, parfum) => {
          return sum + (Number(parfum.price) || 0);
        }, 0);

        setAveragePrice((totalPrice / parfums.length).toFixed(2));
      } else {
        setAveragePrice(0);
      }
    } catch (error) {
      console.log("Erreur chargement parfums");
    }

    try {
      const userRes = await fetch("http://localhost:3000/auth");
      const users = await userRes.json();

      setUserCount(users.length);

      const admins = users.filter((user) => user.admin === true);
      setAdminCount(admins.length);
    } catch (error) {
      console.log("Erreur chargement users");
    }
  }

  return (
    <section className="statSection">
      <div className="statCard">
        <div className="labelStat">Statistiques</div>

        <div className="statContent">
          <h2 className="statTitle">Statistique de Mistify</h2>

          <div className="statList">
            <div className="statItem">
              <p className="statLabel">Parfums</p>
              <h3 className="statValue">{parfumCount}</h3>
            </div>

            <div className="statItem">
              <p className="statLabel">Utilisateurs</p>
              <h3 className="statValue">{userCount}</h3>
            </div>


            <div className="statItem">
              <p className="statLabel">Prix moyen</p>
              <h3 className="statValue">{averagePrice}$</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}