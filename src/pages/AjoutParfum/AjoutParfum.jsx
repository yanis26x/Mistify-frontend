import Footer from "../../components/footer/Footer"
import Navbar from "../../components/navbar/Navbar"
import "./AjoutParfum.css"
import { PiNumberCircleOneFill, PiNumberCircleTwoFill, PiNumberCircleThreeFill } from "react-icons/pi"

export function AjoutParfum() {
    
    function save() {

    }

    function submit() {

    }

    return(
        <>
        <Navbar/>
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
                    <form action="save">
                    <label htmlFor="Brand"> Marque: </label>
                    <input
                        type="brand"
                        name="brand"
                        id="brand"
                        placeholder="Ex.Chanel" />

                    <label htmlFor="Name"> Nom: </label>
                    <input
                        type="name"
                        name="name"
                        id="name"
                        placeholder="Ex.Coco Mademoiselle" />

                    <label htmlFor="Genre"> Genre: </label>
                    <select id="genre" name="genre" defaultValue="" required>
                        <option value="" disabled> -Choisir </option>
                        <option value="woman"> Femme </option>
                        <option value="man"> Homme </option>
                        <option value="unisexe"> Unisexe </option>
                    </select>

                    <fieldset> 
                    <h2> Famille: </h2>
                        <label> 
                        <input
                            type="checkbox"
                            name="family"
                            value="floral"
                            />
                            Floral
                        </label>

                        <label> 
                        <input
                            type="checkbox"
                            name="family"
                            value="chypre"
                            />
                            Chypré
                        </label>

                        <label> 
                        <input
                            type="checkbox"
                            name="checkbox"
                            value="fougere"
                            />  
                            Fougère 
                        </label>

                        <label>
                        <input
                            type="checkbox"
                            name="family"
                            value="cuir"
                            />   
                            Cuir
                        </label>

                        <label> 
                        <input
                            type="checkbox"
                            name="family"
                            value="boise"
                            />   
                            Boisé
                        </label>

                        <label> 
                        <input
                            type="checkbox"
                            name="family"
                            value="oriental"
                            />   
                            Oriental
                        </label>

                        <label> 
                        <input
                            type="checkbox"
                            name="family"
                            value="hesperide"
                            /> 
                            Hespéridé  
                        </label>
                    </fieldset>

                    <label htmlFor="description"> Pourquoi Devrions-nous l'ajouter ? </label>
                    <input
                        type="description"
                        name="description"
                        id="description"
                        placeholder="Décrivez brièvement le parfum ou votre expérience..." />
                    <div className="img">
                        Télécharger une Image
                        <div>
                        <input type="file" id="file-input" name="ImageStyle" />
                        </div>
                    </div>
                    {/* TODO check how to upload an img */}
                    <button onClick={submit}> 
                        <p> Soumettre la demande </p>
                    </button>
                </form>
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
                            <p> Notre équipe vérifie l'authenticité et la
                                pyramide olfactive auprès de la maison.
                            </p>
                        </div>
                    </div>
                    <div className="step-item">
                        <PiNumberCircleThreeFill />
                        <div className="step-content">
                            <h2> Mise en ligne </h2>
                            <p>
                                Une fois validé, le parfum rejoint notre
                                catalogue et vous êtes informé lorsqu'il est disponible.    
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