import React from "react";
import { Link } from "react-router-dom";
import './style.css';


function LoginBar({ statePage, userName, logOut }) {

    return (
        <div className="bar-panel">
            <Link to="/profile"><p className="bar-name">{userName}</p></Link>
            {userName ? <button onClick={() => logOut()} className="bar-button">Выход</button> : <Link state={statePage} to="/login"><button className="bar-button">Вход</button></Link>}
        </div>

    )

}

export default React.memo(LoginBar);


