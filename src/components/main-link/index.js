import React from "react";
import { Link } from 'react-router-dom';
import "./style.css"


function MainLink({ modalName, close, language }) {

    return (<Link className="Main" to="/">
        <button onClick={() => { modalName ? close(false) : "" }} className='main-link'>{language.productLink}</button>
    </Link>);
}



export default React.memo(MainLink);