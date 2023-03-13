import React, { useState, useEffect } from "react";
import axios from "axios";
import { isEmpty } from "../../Utils";
import Navbar from "../../components/Navbar/Navbar";
import Recette from "./Recette";
import ScrollBar from "../../components/ScrollBar/ScrollBar";

const SERVER_ADDRESS = process.env.REACT_APP_SERVER_ADDRESS;

export default function DisplayRecette() {
    const [data, setData] = useState("");
    const [filtres, setFilters] = useState("");
    const [selectedRadio, setSelectedRadio] = useState("")
    const [popupCard, setPopupCard] = useState(false);

      function toggleOverflow(popupCard) {
        setPopupCard(!popupCard)
        const body = document.querySelector('body');
        if (!popupCard) {
            body.classList.add('hidden');
          } else {
            body.classList.remove('hidden');
          }
      }

      document.addEventListener('DOMContentLoaded', () => {
        // Appel initial avec show = false pour enlever la classe
        toggleOverflow(false);
      });

    const nombre = data.length

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(SERVER_ADDRESS + '/api/recette');
            setData(result.data);
        };
        fetchData();
    }, []);

    useEffect(() => {
        fetch(SERVER_ADDRESS + '/api/recette/filtre')
            .then(res => res.json())
            .then(res => setFilters(res))
    }, []);

    const setSelected = (e) => {
        setSelectedRadio(e.target.value)
    }

    //Mets par defaut le selectedRadio sur tous
    const setReset = () => {
        setSelectedRadio("");
    }

    return (
        <>
            <Navbar classNameAccueil="textdeco" />
            <ScrollBar/>
            <div className=" col-12 col-sm-12 col-md-12 col-xl-12 col-xxl-12" id="parent" style={{ marginTop: "100px", marginRight: "auto", marginLeft: 'auto', width: "335px" }}>
                <ul className="divSearch">
                    <li className="mx-1">
                        <input type="radio" name="radio"
                            className="mx-1"
                            value="Tous"
                            id="Tous"
                            onChange={setReset}
                            checked={"" === selectedRadio}
                        />
                        <label htmlFor="Tous">Tous</label>
                    </li>
                    {!isEmpty(filtres) &&
                        filtres.map((filtre) => {
                            return (
                                <li className="mx-1" key={filtre.categories}>
                                    <input
                                        className="mx-1"
                                        type="radio"
                                        name="radio"
                                        checked={filtre.categories === selectedRadio}
                                        value={filtre.categories}
                                        id={filtre.categories}
                                        onChange={setSelected}
                                    />
                                    <label htmlFor={filtre.categories}>{filtre.categories}</label>
                                </li>
                            )
                        })
                    }
                </ul>
                <div className="text-center">
                    <p>{nombre ? nombre : "aucune"} recette{nombre > 1 ? "s" : ""} en base de donnée</p>
                    </div>
            </div>
            <div className="container-fluid" style={{ marginTop: "10px" }}>
                <ul className="row ">
                    {!isEmpty(data) &&
                        data
                            .filter((filtre) => {
                                return filtre.categories.includes(selectedRadio);
                            })
                            .map((recettes) => (
                                <Recette 
                                recette={recettes}
                                 key={recettes.id_recette}
                                 popupCard={popupCard}
                                 toggleOverflow={toggleOverflow}
                                  />
                            ))}
                </ul>
            </div>
        </>
    )
}
