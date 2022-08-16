import React from "react";
import {cn as bem} from "@bem-react/classname";
import {Link} from 'react-router-dom';

function ToHomePage(){
    const cn = bem('Home');

    return (
        <div className={cn()}><Link to='/'>Главная</Link></div>
    )
}

export default ToHomePage;