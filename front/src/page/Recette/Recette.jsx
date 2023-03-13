import React from 'react'
import Button from '../../components/Button/Button';
import Rating from '../../components/Rating/Rating';
import { isEmpty } from "../../Utils";

const SERVER_ADDRESS = process.env.REACT_APP_SERVER_ADDRESS;

export default function Recette(props) {
    const user = "nico";
    const { recette,toggleOverflow, popupCard } = props;
    const courses = recette.ingredient.split(",");
    const ustensiles = recette.ustensile.split(",");

    // bandeau image 
    const ShowNews = () => {
        if (recette.categories) {
            switch (recette.categories) {
                case "Entrée":
                    return <div className="bandeau entree">Entrée</div>
                case "Plat":
                    return <div className="bandeau plat">Plat</div>
                case "Dessert":
                    return <div className="bandeau dessert">Déssert</div>
                default:
            }
        }
    }

    //System de changement d'image 
    const B = "B" + recette.id_recette;
    const ChangeImg = (src) => {
        const B = "B" + recette.id_recette;
        document.getElementById(B).src = src;
    }

    //Calcul temps total
    function calculerTempsTotal(recette) {
        let tpsTotal = 0;
        // Vérifier si tpsCuisson est vide ou non
        if (recette.tpsCuisson) {
            if (recette.tpsCuisson.includes("min")) {
                tpsTotal += parseInt(recette.tpsCuisson);
            } else if (recette.tpsCuisson.includes("h")) {
                tpsTotal += parseInt(recette.tpsCuisson) * 60;
            }
        }
        // Vérifier si tpsPreparation est vide ou non
        if (recette.tpsPreparation) {
            if (recette.tpsPreparation.includes("min")) {
                tpsTotal += parseInt(recette.tpsPreparation);
            } else if (recette.tpsPreparation.includes("h")) {
                tpsTotal += parseInt(recette.tpsPreparation) * 60;
            }
        }
        // Vérifier si tpsRepos est vide ou non
        if (recette.tpsRepos) {
            if (recette.tpsRepos.includes("min")) {
                tpsTotal += parseInt(recette.tpsRepos);
            } else if (recette.tpsRepos.includes("h")) {
                tpsTotal += parseInt(recette.tpsRepos) * 60;
            }
        }
        let heures = Math.floor(tpsTotal / 60);
        let minutes = tpsTotal % 60;
        if (heures === 0) {
            return `${minutes} min`;
        } else if (minutes === 0) {
            return `${heures} h`;
        } else {
            return `${heures} h ${minutes}`;
        }
    }

    function PopupCard() {
        toggleOverflow(!popupCard);
      }
     
    return (
        <div className="col-sm-4">
            <div className="card">
                <div className="card_content">
                    <h5 className="card_title mt-1 text-deco">{recette.nom.charAt(0).toUpperCase() + recette.nom.trim().slice(1)}</h5>
                    <div className='card-img text-center' >
                        <img id={B} className="img-fluid" style={{ height: '280px', width: "380px" }} src={SERVER_ADDRESS + '/images/' + recette.url1} alt={props.nom} title={props.nom} />
                        {ShowNews()}
                    </div>
                    <div className='card-slide text-center mt-1'>
                        {recette.url2 ? <img className='ms-1' style={{ height: '80px', width: "80px" }} src={SERVER_ADDRESS + '/images/' + recette.url1} alt={props.nom} onClick={(e) => ChangeImg(e.target.src)} /> : null}
                        {recette.url3 ? <img className='ms-1' style={{ height: '80px', width: "80px" }} src={SERVER_ADDRESS + '/images/' + recette.url1} alt={props.nom} onClick={(e) => ChangeImg(e.target.src)} /> : null}
                        {recette.url4 ? <img className='ms-1' style={{ height: '80px', width: "80px" }} src={SERVER_ADDRESS + '/images/' + recette.url1} alt={props.nom} onClick={(e) => ChangeImg(e.target.src)} /> : null}
                    </div>
                    <div className='d-flex justify-content-around mt-2'>
                        <p>Niveau : {recette.niveau}</p>
                        <p><i className="fa-regular fa-clock"></i> {calculerTempsTotal(recette)}</p>
                        <p><i className="fa-solid fa-coins"></i> {recette.cout}€</p>
                        <p><i className="fa-solid fa-users"></i> {recette.personne}</p>
                    </div>
                    <div className='d-flex mb-2'>
                        <span className='mx-2'>Note : </span><Rating value={recette.rating} />
                    </div>
                    {!popupCard ?
                        <div className='text-center mb-2'>
                            <Button
                                titre="Afficher la recette complète"
                                 actions={() => {PopupCard(); toggleOverflow(popupCard)}}
                                visuel='btn btn-success'
                            />
                        </div>
                        : null}
                </div>
            </div>
            {popupCard ?
                <section className='popupCardSection' style={{ marginTop: "70px" }}>
                    <div className='popupCard'>
                        <span className='spanPopupCard closepop'
                        onClick={() => {PopupCard(); toggleOverflow(popupCard)}}
                         ><i className="fa-solid fa-circle-xmark closepop"></i></span>
                        <h2 className="card_title mt-1 text-deco">{recette.nom.charAt(0).toUpperCase() + recette.nom.trim().slice(1)}</h2>
                        {/* 1er partie haut  */}
                        <div className='d-flex' >
                            {/* Info cuisson prix personne etc ...  */}
                            <div className='col-3 col-sm-3 col-lg-3 ms-5'>
                                <div className='d-flex justify-content-around mt-2'>
                                    <p className="">Niveau : {recette.niveau}</p>
                                    <p className=""><i className="fa-regular fa-clock"></i> {calculerTempsTotal(recette)}</p>
                                    <p className=""><i className="fa-solid fa-coins"></i> {recette.cout}€</p>
                                    <p className=""><i className="fa-solid fa-users"></i> {recette.personne}</p>
                                </div>
                                <div className='d-flex mb-2'>
                                    <span className='mx-2'>Note : </span><Rating value={recette.rating} />
                                </div>
                            </div>
                            {/* div photo */}
                            <div className="">
                                <div className='card-img text-center' >
                                    <img id={B} className="img-fluid" style={{ height: '280px', width: "380px" }} src={SERVER_ADDRESS + '/images/' + recette.url1} alt={props.nom} title={props.nom} />
                                    {ShowNews()}
                                </div>
                                <div className='card-slide text-center'>
                                    {recette.url2 ? <img className='ms-1' style={{ height: '80px', width: "80px" }} src={SERVER_ADDRESS + '/images/' + recette.url1} alt={props.nom} onClick={(e) => ChangeImg(e.target.src)} /> : null}
                                    {recette.url3 ? <img className='ms-1' style={{ height: '80px', width: "80px" }} src={SERVER_ADDRESS + '/images/' + recette.url1} alt={props.nom} onClick={(e) => ChangeImg(e.target.src)} /> : null}
                                    {recette.url4 ? <img className='ms-1' style={{ height: '80px', width: "80px" }} src={SERVER_ADDRESS + '/images/' + recette.url1} alt={props.nom} onClick={(e) => ChangeImg(e.target.src)} /> : null}
                                </div>
                            </div>
                        </div>
                        {/* 2em partie milieu  */}
                        <div className='d-flex mt-3'>
                            {/* Ingredients  */}
                            <div className='col-6 col-sm-6 col-lg-6'>
                                <h2 className='text-deco'>Ingrédients</h2>
                                <ul style={{ listStyle: "none" }}>
                                    {!isEmpty(courses) && courses.map((course, index) => (
                                        <li key={index}>{course.trim().charAt(0).toUpperCase() + course.trim().slice(1)}</li>
                                    ))}
                                </ul>
                            </div>
                            {/* Ustensiles  */}
                            <div className='col-6 col-sm-6 col-lg-6'>
                                <h2 className='text-deco'>Ustensiles</h2>
                                <ul style={{ listStyle: "none" }}>
                                    {!isEmpty(ustensiles) && ustensiles.map((ustensil, index) => (
                                        <li key={index}>{ustensil.trim().charAt(0).toUpperCase() + ustensil.trim().slice(1)}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div>
                            <div className='d-flex mt-2'>
                                {/* Preparation  */}
                                <div className='col-6 col-sm-6 col-lg-6'>
                                    <h2 className='text-deco'>Préparation</h2>
                                    <p className='text-center'>Temps total : {calculerTempsTotal(recette)}</p>
                                    <div className='d-flex justify-content-evenly'>
                                        <div>
                                            <p><strong>Préparation</strong></p>
                                            <span>{recette.tpsPreparation}</span>
                                        </div>
                                        <div>
                                            <p><strong>Repos</strong></p>
                                            <span>{recette.tpsRepos}</span>
                                        </div>
                                        <div>
                                            <p><strong>Cuisson</strong></p>
                                            <span>{recette.tpsCuisson}</span>

                                        </div>
                                    </div>
                                </div>
                                {/* Commencer la recette  */}
                                <div className='col-6 col-sm-6 col-lg-6'>
                                    <div>
                                        <h2 className='text-deco'>Commencer la recette</h2></div>
                                    <div>
                                        <div>
                                            <p className='m0'>étape 1</p>
                                            <p className='m4'>{recette.etape1}</p>
                                        </div>
                                        <div>
                                        <p className='m0'>étape 2</p>
                                            <p className='m4'>{recette.etape2}</p>
                                        </div>
                                        <div>
                                        <p className='m0'>étape 3</p>
                                            <p className='m4'>{recette.etape3}</p>
                                        </div>
                                        <div>
                                        <p className='m0'>étape 4</p>
                                            <p className='m4'>{recette.etape4}</p>
                                        </div>
                                        <div> 
                                            <p className='m0'>étape 5</p>
                                            <p className='m4'>{recette.etape5}</p>
                                            </div>
                                        <div>
                                        <p className='m0'>étape 6</p>
                                            <p className='m4'>{recette.etape6}</p>
                                        </div>
                                        <div>
                                        <p className='m0'>étape 7</p>
                                            <p className='m4'>{recette.etape7}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                {recette.boisson ? <div>
                                    <div className='offset-4 col-4 col-sm-4 col-lg-4 mb-4'>
                                        <h2 className='text-deco'>Boisson</h2>
                                        <p className='text-center'>{recette.boisson.charAt(0).toUpperCase() + recette.boisson.trim().slice(1)} </p>
                                    </div>
                                </div> : null}
                                <div className='d-flex justify-content-center mb-4'>
                                    <div className=''>
                                        {props.user === recette.auteur ?
                                            <Button
                                                titre="Suppression"
                                                visuel='btn btn-success'
                                            />
                                            : null}
                                    </div>
                                    <div className='text-center mboutton'>
                                        <Button
                                            titre="Refermer"
                                            actions={() => {PopupCard(); toggleOverflow(popupCard)}}
                                            visuel='btn btn-success'
                                        />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
                : null}
        </div>
    )
}
