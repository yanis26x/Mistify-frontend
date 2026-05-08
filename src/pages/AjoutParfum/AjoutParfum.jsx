import Footer from "../../components/footer/Footer"
import Navbar from "../../components/navbar/Navbar"
import "./AjoutParfum.css"
import { PiNumberCircleOneFill, PiNumberCircleTwoFill, PiNumberCircleThreeFill } from "react-icons/pi"
import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const API_URL = "http://localhost:3000"

export default function AjoutParfum() {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [message, setMessage] = useState("")
    const [envoi, setEnvoi] = useState(false)
    const [formulaire, setFormulaire] = useState({
        brand: "",
        name: "",
        gender: "",
        family: "",
        description: "",
        imageUrl: "",
        price: "",
        volume: "",
        year: "",
    })

    useEffect(() => {
        async function chargerUtilisateur() {
            try {
                const res = await axios.get(`${API_URL}/users/whoami`, {
                    withCredentials: true,
                })
                setUser(res.data)
            } catch {
                setUser(null)
            }
        }

        chargerUtilisateur()
    }, [])

    function changerChamp(event) {
        const { name, value } = event.target
        setFormulaire((ancienFormulaire) => ({
            ...ancienFormulaire,
            [name]: value,
        }))
    }

    async function submit(event) {
        event.preventDefault()
        setMessage("")

        if (!user) {
            setMessage("Vous devez etre connecte pour faire une demande.")
            navigate("/compte")
            return
        }

        if (!formulaire.family) {
            setMessage("Vous devez choisir une famille olfactive.")
            return
        }

        try {
            setEnvoi(true)

            const demande = {
                name: formulaire.name,
                brand: formulaire.brand,
                gender: formulaire.gender || undefined,
                family: formulaire.family,
                description: formulaire.description || undefined,
                imageUrl: formulaire.imageUrl || undefined,
                price: formulaire.price ? Number(formulaire.price) : undefined,
                volume: formulaire.volume ? Number(formulaire.volume) : undefined,
                year: formulaire.year ? Number(formulaire.year) : undefined,
                userId: user.id,
            }

            await axios.post(`${API_URL}/ajout/demandeParfum`, demande, {
                withCredentials: true,
            })

            setFormulaire({
                brand: "",
                name: "",
                gender: "",
                family: "",
                description: "",
                imageUrl: "",
                price: "",
                volume: "",
                year: "",
            })
            setMessage("Demande envoyee. Elle est maintenant en attente de validation admin.")
            alert("Parfum soumis, en attente d'approbation par un admin.")
        } catch (err) {
            setMessage(err?.response?.data?.message || "Erreur pendant l'envoi de la demande.")
        } finally {
            setEnvoi(false)
        }
    }

    return(
        <>
        <Navbar user={user} onGoToCompte={() => navigate("/compte")} />
        <div className="container">
            <div className="header-card">
                    <h2> Demander l'ajout de parfum </h2>
                    <p> Vous ne trouvez pas votre fragrance préférée dans notre bibliothèque ? Partagez vos découvertes avec la
                        communauté Mistify. Remplissez le formulaire ci-dessous et nos experts analyseront votre demande pour
                        l'intégrer à notre collection d'Éditions de Parfum. 
                    </p>
            </div>

            <div className="all">
                <div className="left-side">
                    {!user ? (
                        <div className="message-connexion-demande">
                            <p>Vous devez etre connecte pour demander l'ajout d'un parfum.</p>
                            <button type="button" className="submit-btn" onClick={() => navigate("/compte")}>
                                Se connecter
                            </button>
                        </div>
                    ) : (
                    <form onSubmit={submit}>
                    <label htmlFor="Brand"> Marque: </label>
                    <input
                        type="text"
                        name="brand"
                        id="brand"
                        value={formulaire.brand}
                        onChange={changerChamp}
                        placeholder="Ex.Chanel"
                        required />

                    <label htmlFor="Name"> Nom: </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={formulaire.name}
                        onChange={changerChamp}
                        placeholder="Ex.Coco Mademoiselle"
                        required />

                    <label htmlFor="Genre"> Genre: </label>
                    <select
                        id="gender"
                        name="gender"
                        value={formulaire.gender}
                        onChange={changerChamp}
                    >
                        <option value="" disabled> -Choisir </option>
                        <option value="woman"> Femme </option>
                        <option value="man"> Homme </option>
                        <option value="unisexe"> Unisexe </option>
                    </select>

                    <label htmlFor="family"> Famille: </label>
                    <select
                        id="family"
                        name="family"
                        value={formulaire.family}
                        onChange={changerChamp}
                        required
                    >
                        <option value=""> -Choisir </option>
                        <option value="Frais"> Frais </option>
                        <option value="Sucré"> Sucré </option>
                        <option value="Boisé"> Boisé </option>
                        <option value="Épicé"> Épicé </option>
                    </select>

                    <div className="ligne-formulaire">
                        <div>
                            <label htmlFor="price"> Prix: </label>
                            <input
                                type="number"
                                name="price"
                                id="price"
                                min="0"
                                step="0.01"
                                value={formulaire.price}
                                onChange={changerChamp}
                                placeholder="Ex.120" />
                        </div>

                        <div>
                            <label htmlFor="volume"> Volume: </label>
                            <input
                                type="number"
                                name="volume"
                                id="volume"
                                min="0"
                                value={formulaire.volume}
                                onChange={changerChamp}
                                placeholder="Ex.50" />
                        </div>
                    </div>

                    <label htmlFor="year"> Année: </label>
                    <input
                        type="number"
                        name="year"
                        id="year"
                        min="0"
                        value={formulaire.year}
                        onChange={changerChamp}
                        placeholder="Ex.2024" />

                    <label htmlFor="imageUrl"> Image: </label>
                    <input
                        type="url"
                        name="imageUrl"
                        id="imageUrl"
                        value={formulaire.imageUrl}
                        onChange={changerChamp}
                        placeholder="https://exemple.com/image.jpg" />

                    <label htmlFor="description"> Description du parfum: </label>
                    <textarea
                        name="description"
                        id="description"
                        value={formulaire.description}
                        onChange={changerChamp}
                        placeholder="Décrivez ses notes, son style, son intensité ou l'ambiance du parfum..." />

                    {message && <p className="message-demande">{message}</p>}

                    <button className="submit-btn" type="submit" disabled={envoi}>
                        {envoi ? "Envoi..." : "Soumettre la demande"}
                    </button>
                </form>
                    )}
                </div>
                
                <aside className="right-side">
                    <h3> Comment ça fonctionne ? </h3>
                    <div className="step-item">
                      <PiNumberCircleOneFill /> 
                      <div className="step-content">
                            <h2> Soumission </h2>
                        <p>
                            Remplissez les détails du parfum et
                            joignez une photo claire du flacon.
                        </p>
                      </div>
                      
                    </div>
                    <div className="step-item">
                        <PiNumberCircleTwoFill />
                        <div className="step-content">
                            <h2> Vérification </h2>
                            <p> Un admin regarde la demande avant de
                                l'ajouter dans la collection.
                            </p>
                        </div>
                    </div>
                    <div className="step-item">
                        <PiNumberCircleThreeFill />
                        <div className="step-content">
                            <h2> Mise en ligne </h2>
                            <p>
                                Si la demande est acceptee, le parfum est cree
                                dans la base de donnees.    
                            </p>
                        </div>
                    </div>
                </aside>
                </div>
            </div>
            <Footer/>
        </>
    )
  
}
