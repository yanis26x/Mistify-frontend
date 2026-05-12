import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import "./DetailsParfum.css";
import { getImageUrl } from "../../utils/imageUrl";

const API_URL = "http://localhost:3000";
const PHOTOS_PROFIL = [
  { titre: "VaMP", src: "/vampp.jpeg" },
  { titre: "hElL0 - kItTy", src: "/Hello-kitty.webp" },
  { titre: "sora", src: "/sora.jpg" },
  { titre: "I AM MUSIC", src: "/logo-mistify.png" },
];

export default function DetailsParfum() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [parfum, setParfum] = useState(null);
  const [utilisateur, setUtilisateur] = useState(null);
  const [commentaires, setCommentaires] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [chargementCommentaires, setChargementCommentaires] = useState(true);

  const [texteCommentaire, setTexteCommentaire] = useState("");
  const [noteCommentaire, setNoteCommentaire] = useState("5");
  const [envoiCommentaire, setEnvoiCommentaire] = useState(false);
  const [afficherFormulaireAvis, setAfficherFormulaireAvis] = useState(false);
  const [photoChoisie, setPhotoChoisie] = useState(PHOTOS_PROFIL[0]);
  const [photosParUtilisateur, setPhotosParUtilisateur] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("photosCommentaires")) || {};
    } catch {
      return {};
    }
  });
  const [commentairesModifies, setCommentairesModifies] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("commentairesModifies")) || {};
    } catch {
      return {};
    }
  });
  const [commentaireEnModification, setCommentaireEnModification] = useState(null);
  const [texteModification, setTexteModification] = useState("");
  const [noteModification, setNoteModification] = useState("5");
  const [envoiModificationCommentaire, setEnvoiModificationCommentaire] = useState(false);

  const [formulaireEditionParfum, setFormulaireEditionParfum] = useState({
    name: "",
    brand: "",
    description: "",
    family: "",
    volume: "",
    price: "",
    gender: "",
    year: "",
    disponibility: "false",
    imageUrl: "",
  });
  const [envoiEditionDetail, setEnvoiEditionDetail] = useState(false);
  const [suppression, setSuppression] = useState(false);

  const chargerParfum = useCallback(async () => {
    try {
      setChargement(true);
      const reponse = await fetch(`${API_URL}/parfums/${id}`, {
        credentials: "include",
      });
      const data = await reponse.json();

      setParfum(data);
    } catch {
      setParfum(null);
    } finally {
      setChargement(false);
    }
  }, [id]);

  const chargerCommentaires = useCallback(async () => {
    try {
      setChargementCommentaires(true);
      const reponse = await fetch(`${API_URL}/parfums/${id}/commentaires`, {
        credentials: "include",
      });
      const data = await reponse.json();
      setCommentaires(Array.isArray(data) ? data : []);
    } catch {
      setCommentaires([]);
    } finally {
      setChargementCommentaires(false);
    }
  }, [id]);

  const verifierUtilisateur = useCallback(async () => {
    try {
      const reponse = await axios.get(`${API_URL}/users/whoami`, {
        withCredentials: true,
      });
      setUtilisateur(reponse.data);
    } catch {
      setUtilisateur(null);
    }
  }, []);

  useEffect(() => {
    chargerParfum();
    chargerCommentaires();
    verifierUtilisateur();
    window.addEventListener("auth-change", verifierUtilisateur);

    return () => {
      window.removeEventListener("auth-change", verifierUtilisateur);
    };
  }, [chargerParfum, chargerCommentaires, verifierUtilisateur]);

  useEffect(() => {
    if (!parfum) return;

    setFormulaireEditionParfum({
      name: parfum.name || "",
      brand: parfum.brand || "",
      description: parfum.description || "",
      family: parfum.family || "",
      volume: parfum.volume === null || parfum.volume === undefined ? "" : String(parfum.volume),
      price: parfum.price === null || parfum.price === undefined ? "" : String(parfum.price),
      gender: parfum.gender || "",
      year: parfum.year === null || parfum.year === undefined ? "" : String(parfum.year),
      disponibility: parfum.disponibility ? "true" : "false",
      imageUrl: parfum.imageUrl || "",
    });
  }, [parfum]);

  async function ajouterAuPanier() {
    if (!utilisateur) {
      alert("Connecte-toi pour ajouter au panier.");
      navigate("/compte");
      return;
    }

    try {
      await axios.post(
        `${API_URL}/panier`,
        { parfumId: parfum.id, quantite: 1 },
        { withCredentials: true }
      );
      window.dispatchEvent(new Event("panier-change"));
      alert("Ajoute au panier !");
      // ou montrer persona dialogue !!!!1
    } catch {
      alert("Impossible d'ajouter au panier.");
    }
  }

  async function envoyerCommentaire(e) {
    e.preventDefault();

    if (!utilisateur) {
      alert("Connecte-toi pour commenter.....");
      navigate("/compte");
      return;
    }

    if (!texteCommentaire.trim()) {
      alert("T'essaye vraiment de rien poster?! #$%!@");
      return;
    }

    try {
      setEnvoiCommentaire(true);
      const reponse = await fetch(`${API_URL}/parfums/${id}/commentaires`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          content: texteCommentaire,
          rating: Number(noteCommentaire),
          userId: utilisateur.id,
        }),
      });

      if (!reponse.ok) {
        let erreur = null;
        try {
          erreur = await reponse.json();
        } catch {
          erreur = null;
        }

        alert(erreur?.message || "erreur....");
        return;
      }

      const nouvellesPhotos = {
        ...photosParUtilisateur,
        [utilisateur.id]: photoChoisie,
      };

      localStorage.setItem("photosCommentaires", JSON.stringify(nouvellesPhotos));
      setPhotosParUtilisateur(nouvellesPhotos);
      setTexteCommentaire("");
      setNoteCommentaire("5");
      setAfficherFormulaireAvis(false);
      await chargerCommentaires();
    } catch {
      alert("erreur.....");
    } finally {
      setEnvoiCommentaire(false);
    }
  }

  async function supprimerCommentaire(commentaireId) {
    const confirmation = window.confirm("tu veux vraimment supp ce commentaire?!?!");
    if (!confirmation) return;

    try {
      const reponse = await fetch(`${API_URL}/commentaires/${commentaireId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!reponse.ok) {
        let erreur = null;
        try {
          erreur = await reponse.json();
        } catch {
          erreur = null;
        }

        alert(erreur?.message || "on arrive pas a le supprimer....");
        return;
      }

      await chargerCommentaires();
    } catch {
      alert("Erreur...");
    }
  }

  function ouvrirModificationCommentaire(commentaire) {
    setCommentaireEnModification(commentaire.id);
    setTexteModification(commentaire.content || "");
    setNoteModification(String(commentaire.rating || 5));
  }

  function fermerModificationCommentaire() {
    setCommentaireEnModification(null);
    setTexteModification("");
    setNoteModification("5");
  }

  async function modifierCommentaire(e, commentaireId) {
    e.preventDefault();

    if (!texteModification.trim()) {
      alert("T'essaye vraiment de rien poster?! #$%!@");
      return;
    }

    try {
      setEnvoiModificationCommentaire(true);

      const donneesCommentaire = {
        content: texteModification,
        rating: Number(noteModification),
      };

      let reponse = await fetch(`${API_URL}/commentaires/${commentaireId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(donneesCommentaire),
      });

      if (!reponse.ok) {
        reponse = await fetch(`${API_URL}/commentaires/${commentaireId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(donneesCommentaire),
        });
      }

      if (!reponse.ok) {
        let erreur = null;
        try {
          erreur = await reponse.json();
        } catch {
          erreur = null;
        }

        alert(erreur?.message || "on arrive pas a le modifier....");
        return;
      }

      const nouveauxCommentairesModifies = {
        ...commentairesModifies,
        [commentaireId]: true,
      };

      localStorage.setItem(
        "commentairesModifies",
        JSON.stringify(nouveauxCommentairesModifies)
      );
      setCommentairesModifies(nouveauxCommentairesModifies);
      fermerModificationCommentaire();
      await chargerCommentaires();
    } catch {
      alert("erreur....");
    } finally {
      setEnvoiModificationCommentaire(false);
    }
  }

  function convertirValeurDetail(champ, valeur) {
    const valeurNettoyee = valeur.trim();

    if (["price", "volume", "year"].includes(champ)) {
      return valeurNettoyee === "" ? undefined : Number(valeurNettoyee);
    }

    if (champ === "disponibility") {
      return ["oui", "true", "1", "disponible"].includes(
        valeurNettoyee.toLowerCase()
      );
    }

    return valeurNettoyee;
  }

  function modifierChampEditionParfum(champ, valeur) {
    setFormulaireEditionParfum((formulaireActuel) => ({
      ...formulaireActuel,
      [champ]: valeur,
    }));
  }

  async function enregistrerEditionDetail(e) {
    e.preventDefault();
    if (envoiEditionDetail) return;

    try {
      setEnvoiEditionDetail(true);
      const donneesParfum = Object.entries(formulaireEditionParfum).reduce(
        (donnees, [champ, valeur]) => ({
          ...donnees,
          [champ]: convertirValeurDetail(champ, valeur),
        }),
        {}
      );

      const reponse = await fetch(`${API_URL}/parfums/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(donneesParfum),
      });

      if (!reponse.ok) {
        let erreur = null;
        try {
          erreur = await reponse.json();
        } catch {
          erreur = null;
        }

        alert(erreur?.message || "on arrive pas a le modifier....");
        return;
      }

      const data = await reponse.json();
      setParfum((parfumActuel) => ({
        ...parfumActuel,
        ...data,
      }));
    } catch {
      alert("erreur....");
    } finally {
      setEnvoiEditionDetail(false);
    }
  }

  async function supprimerParfum() {
    const confirmation = window.confirm("Tu veux vraiment supprimer ce parfum ?!");
    if (!confirmation) return;

    try {
      setSuppression(true);
      const reponse = await fetch(`${API_URL}/parfums/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!reponse.ok) {
        let erreur = null;
        try {
          erreur = await reponse.json();
        } catch {
          erreur = null;
        }

        alert(erreur?.message || "on arrive pas a le supprimer....");
        return;
      }

      navigate("/");
    } catch {
      alert("Erreur....");
    } finally {
      setSuppression(false);
    }
  }

  if (chargement) {
    return (
      <div className="pageDetails">
        <Navbar user={utilisateur} onGoToCompte={() => navigate("/compte")} />
        <p className="detailsMessage">en cours...</p>
      </div>
    );
  }

  if (!parfum) {
    return (
      <div className="pageDetails">
        <Navbar user={utilisateur} onGoToCompte={() => navigate("/compte")} />
        <div className="detailsVide">
          <h1>Parfum introuvable...</h1>
          <button className="boutonPrincipal" onClick={() => navigate("/")}>
            Retour accueil?!
          </button>
        </div>
      </div>
    );
  }

  const sourceImage = getImageUrl(parfum.imageUrl, API_URL);

  function afficherValeur(valeur, texteVide = "Non renseigné") {
    if (valeur === null || valeur === undefined || valeur === "") {
      return texteVide;
    }

    if (typeof valeur === "boolean") {
      return valeur ? "Oui" : "Non";
    }

    return valeur;
  }

  function donnerAvis() {
    if (!utilisateur) {
      alert("Tu dois être connecté pour donner un avis.....");
      navigate("/compte");
      return;
    }

    setAfficherFormulaireAvis(!afficherFormulaireAvis);
  }

  function afficherEtoiles(note) {
    const noteNombre = Number(note) || 0;
    return "★".repeat(noteNombre) + "☆".repeat(5 - noteNombre);
  }

  function afficherNotesParfum(notes) {
    if (Array.isArray(notes)) {
      return notes.filter(Boolean).join(", ");
    }

    return notes || "";
  }

  function estAuteurCommentaire(commentaire) {
    const auteurId = commentaire.userId || commentaire.user?.id || commentaire.user?._id;
    const utilisateurId = utilisateur?.id || utilisateur?._id;

    return Boolean(utilisateurId && auteurId && String(auteurId) === String(utilisateurId));
  }

  function peutSupprimerCommentaire(commentaire) {
    return utilisateur?.admin || estAuteurCommentaire(commentaire);
  }

  function adminPeutSupprimerCommentaire(commentaire) {
    return utilisateur?.admin && !estAuteurCommentaire(commentaire);
  }

  function afficherPhotoCommentaire(commentaire) {
    const auteurId = commentaire.userId || commentaire.user?.id;
    const photoSauvegardee = photosParUtilisateur[auteurId];
    return commentaire.profileImage || photoSauvegardee?.src || "/vampp.jpeg";
  }

  function commentaireModifie(commentaire) {
    if (commentairesModifies[commentaire.id]) return true;
    if (commentaire.edited) return true;
    if (!commentaire.createdAt || !commentaire.updatedAt) return false;

    return new Date(commentaire.updatedAt).getTime() > new Date(commentaire.createdAt).getTime();
  }

  const notes = commentaires
    .map((commentaire) => Number(commentaire.rating))
    .filter((note) => !Number.isNaN(note) && note > 0);

  const moyenneNotes =
    notes.length > 0
      ? notes.reduce((total, note) => total + note, 0) / notes.length
      : null;

  return (
    <div className="pageDetails">
      <Navbar user={utilisateur} onGoToCompte={() => navigate("/compte")} />

      <main className="layoutDetails">
        <section className="carteDetails">
          <img
            src={sourceImage}
            alt={parfum.name}
            onError={(e) => {
              e.currentTarget.src = "/flacon-parfum.png";
            }}
          />

          <div>
            <h1>{parfum.name}</h1>
            <p>{parfum.brand || "Marque inconnue"}</p>

            <div className="prixDetails">{parfum.price}$</div>

            <div className="moyenneDansCarte">
              <span>Moyenne</span>
              <strong>
                {moyenneNotes ? `${moyenneNotes.toFixed(1)} / 5` : "Aucune note"}
              </strong>
            </div>


            <p>{parfum.description || "Aucune description"}</p>

            <div className="detailsCompletsParfum">
              <h2>Détails du parfum</h2>

              <div className="detailsGrilleParfum">
                <div>
                  <span>ID</span>
                  <strong>{afficherValeur(parfum.id)}</strong>
                </div>

                <div>
                  <span>Nom</span>
                  <strong>{afficherValeur(parfum.name)}</strong>
                </div>

                <div>
                  <span>Marque</span>
                  <strong>{afficherValeur(parfum.brand)}</strong>
                </div>

                <div>
                  <span>Famille</span>
                  <strong>{afficherValeur(parfum.famille?.name)}</strong>
                </div>

                <div>
                  <span>Note</span>
                  <strong>{parfum.rating ? `${parfum.rating} / 5` : "Non renseignée"}</strong>
                </div>

                <div>
                  <span>Volume</span>
                  <strong>{parfum.volume ? `${parfum.volume} ml` : "Non renseigné"}</strong>
                </div>

                <div>
                  <span>Prix</span>
                  <strong>{parfum.price ? `${parfum.price}$` : "Non renseigné"}</strong>
                </div>

                <div>
                  <span>Genre</span>
                  <strong>{afficherValeur(parfum.gender)}</strong>
                </div>

                <div>
                  <span>Année</span>
                  <strong>{afficherValeur(parfum.year)}</strong>
                </div>

                <div>
                  <span>Disponible</span>
                  <strong>{afficherValeur(parfum.disponibility)}</strong>
                </div>

                <div className="detailsImageUrl">
                  <span>Image URL</span>
                  <strong>{afficherValeur(parfum.imageUrl)}</strong>
                </div>
              </div>
            </div>

            <div className="notesOlfactives">
              {afficherNotesParfum(parfum.topNotes) && (
                <p>
                  <strong>notes primaire :</strong> {afficherNotesParfum(parfum.topNotes)}
                </p>
              )}

              {afficherNotesParfum(parfum.middleNotes) && (
                <p>
                  <strong>notes du milieu :</strong> {afficherNotesParfum(parfum.middleNotes)}
                </p>
              )}

              {afficherNotesParfum(parfum.baseNotes) && (
                <p>
                  <strong>notes la + faible :</strong> {afficherNotesParfum(parfum.baseNotes)}
                </p>
              )}
            </div>


            {utilisateur?.admin && (
              <div className="actionsAdmin">
                <button
                  className="boutonAdmin"
                  onClick={supprimerParfum}
                  disabled={suppression}
                >
                  {suppression ? "Suppression..." : "Supprimer ce parfum (admin)"}
                </button>
              </div>
            )}
          </div>
        </section>

        <div className="colonneResumeDetails">
          <aside className="resumeDetails">
            <h2>Résumé</h2>

            <div className="ligneDetails">
              <span>Prix</span>
              <strong>{parfum.price}$</strong>
            </div>

            <div className="ligneDetails">
              <span>Commentaires</span>
              <strong>{commentaires.length}</strong>
            </div>

            <button
              className="boutonAdmin"
              onClick={ajouterAuPanier}
            >
              Ajouter au panier
            </button>
          </aside>

        </div>
      </main>

      <section className="blocDetails avisClients">
        <div className="enteteAvis">
          <div>
            <h2>Commentaires</h2>
            <p>
              {commentaires.length} au total
              
            </p>
          </div>

          <button className="boutonAdmin boutonEntete" onClick={donnerAvis}>
            Publier un avis
          </button>
        </div>

        {afficherFormulaireAvis && (
          <form className="formulaireCommentaire" onSubmit={envoyerCommentaire}>
            <div className="choixPhotoProfil">
              <p>Choisis ta photo de profil!!</p>

              <div className="listePhotosProfil">
                {PHOTOS_PROFIL.map((photo) => (
                  <button
                    type="button"
                    key={photo.src}
                    className={
                      photoChoisie.src === photo.src
                        ? "photoProfilOption photoProfilActive"
                        : "photoProfilOption"
                    }
                    onClick={() => setPhotoChoisie(photo)}
                  >
                    <img src={photo.src} alt={photo.titre} />
                    <span>{photo.titre}</span>
                  </button>
                ))}
              </div>
            </div>

            <textarea
              value={texteCommentaire}
              onChange={(e) => setTexteCommentaire(e.target.value)}
              placeholder="Ton avis sur ce parfum..."
            />

            <div className="basCommentaire">
              <select
                value={noteCommentaire}
                onChange={(e) => setNoteCommentaire(e.target.value)}
              >
                <option value="1">1 / 5</option>
                <option value="2">2 / 5</option>
                <option value="3">3 / 5</option>
                <option value="4">4 / 5</option>
                <option value="5">5 / 5</option>
              </select>

              <button className="boutonPrincipal" disabled={envoiCommentaire}>
                {envoiCommentaire ? "Envoi..." : "Publier"}
              </button>
            </div>
          </form>
        )}

        {chargementCommentaires ? (
          <p className="texteDiscret">Chargement des commentaires...</p>
        ) : commentaires.length === 0 ? (
          <p className="texteDiscret">Aucun commentaire pour ce parfum.....</p>
        ) : (
          <div className="listeCommentaires">
            {commentaires.map((commentaire) => (
              <article className="carteCommentaire" key={commentaire.id}>
                <div>
                  <div className="profilCommentaire">
                    <img
                      src={afficherPhotoCommentaire(commentaire)}
                      alt="Photo de profil"
                    />

                    <div>
                      <p>
                        <strong>{commentaire.user?.name || "Utilisateur"}</strong>
                        {commentaireModifie(commentaire) && (
                          <span>commentaire modifié</span>
                        )}
                      </p>
                      <div className="etoilesCommentaire">
                        {afficherEtoiles(commentaire.rating)}
                      </div>
                    </div>
                  </div>

                </div>

                {commentaireEnModification === commentaire.id ? (
                  <form
                    className="formulaireCommentaire"
                    onSubmit={(e) => modifierCommentaire(e, commentaire.id)}
                  >
                    <textarea
                      value={texteModification}
                      onChange={(e) => setTexteModification(e.target.value)}
                    />

                    <div className="basCommentaire">
                      <select
                        value={noteModification}
                        onChange={(e) => setNoteModification(e.target.value)}
                      >
                        <option value="1">1 / 5</option>
                        <option value="2">2 / 5</option>
                        <option value="3">3 / 5</option>
                        <option value="4">4 / 5</option>
                        <option value="5">5 / 5</option>
                      </select>

                      <button
                        className="boutonPrincipal"
                        disabled={envoiModificationCommentaire}
                      >
                        {envoiModificationCommentaire ? "Enregistrement..." : "Enregistrer"}
                      </button>
                    </div>

                    <button
                      type="button"
                      className="boutonSecondaire petitBouton"
                      onClick={fermerModificationCommentaire}
                    >
                      Annuler
                    </button>
                  </form>
                ) : (
                  <>
                    <p className="texteCommentaire">
                      {commentaire.content || "Commentaire vide"}
                    </p>
                  </>
                )}

                {adminPeutSupprimerCommentaire(commentaire) &&
                  commentaireEnModification !== commentaire.id && (
                  <div className="actionsCommentaire">
                    <button
                      className="boutonAdmin petitBouton"
                      onClick={() => supprimerCommentaire(commentaire.id)}
                    >
                      Supprimer ce commentaire (admin)
                    </button>
                  </div>
                )}

                {estAuteurCommentaire(commentaire) &&
                  peutSupprimerCommentaire(commentaire) &&
                  commentaireEnModification !== commentaire.id && (
                  <div className="actionsCommentaire">
                    <button
                      className="boutonDanger petitBouton"
                      onClick={() => supprimerCommentaire(commentaire.id)}
                    >
                      Supprimer
                    </button>

                    <button
                      className="boutonSecondaire petitBouton"
                      onClick={() => ouvrirModificationCommentaire(commentaire)}
                    >
                      Modifier
                    </button>
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
}
