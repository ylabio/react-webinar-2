import React from "react";
import { Link } from "react-router-dom";
import {cn as bem} from "@bem-react/classname";
import "./style.css";

function Menu(props) {

    const cn = bem('Menu');

    return(
        <Link to={"/"} className={cn('link')} onClick={()=> {
            props.onNavigate()
        }} >Главная</Link>
    )
}

export default React.memo(Menu)
