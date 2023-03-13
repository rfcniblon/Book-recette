import React from 'react'

export default function Button(props) {

    const AfficheLogo = () => {
        switch (props.icone) {
            case "fb":
                return <i className="fa-brands fa-facebook"></i>
            case "insta":
                return <i className="fa-brands fa-instagram"></i>
            default:
                return null
        }
    }

    return (
        <button onClick={props.actions}
            title={props.titre}
            className={props.visuel}>
            {props.titre} {AfficheLogo()}
        </button>
    )
}
