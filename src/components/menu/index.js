import React from "react";
import {Link} from "react-router-dom";
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Menu() {
    const cn = bem('Menu');
    return (
        <Link className={cn('header-link')} to={'/'}>Главная</Link>
    )
}

export default React.memo(Menu);