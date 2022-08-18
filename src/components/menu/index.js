import React from "react";
import { Link } from "react-router-dom";
import {cn as bem} from "@bem-react/classname";
import "./style.css";

function Menu(props) {

    const cn = bem('Menu');

    return(
        <ul className={cn("list")}>
            <li>
                <Link to={"/"} className={cn('link')} onClick={()=> {
                    props.onNavigate()
                }} >Главная</Link>
            </li>
        </ul>
    )
}

export default React.memo(Menu)
