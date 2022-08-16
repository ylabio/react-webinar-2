import React from "react";
import {Link} from "react-router-dom";
import {cn as bem} from "@bem-react/classname";
import "./home-link.css";

function HomeLink(){
    const cn = bem('HomeLink');

    return(
        <div className={cn()}>
            <Link to="/">Главная</Link>
        </div>
    )
}

export default HomeLink;