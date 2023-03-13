import React from "react";

export default function Navbar(props) {

  return (
    <nav className="container-fluid nav ">
      <input type="checkbox" id="nav-check" />
      <div className="nav-header">
        <div className="nav-title">
          <a href="/" className="a_deco">Mon livre de recettes</a>
        </div>
      </div>
      <div className="nav-btn">
        <label htmlFor="nav-check">
          <span></span>
          <span></span>
          <span></span>
        </label>
      </div>
      <div className="nav-links">
        <a className={props.classNameAccueil ? props.classNameAccueil : null} href="/">Accueil</a>
        <a href="/mesrecettes" className={props.classNameRecettes}>Mes recettes</a>
        {props.user ? <a href="/addrecette" className={props.classNameAjoutRecette}>Ajout</a> : null}
        <a href="/login"><i className="far fa-user" title='logo_admin'></i></a>
      </div>
    </nav>
  )
}
