import React from "react";
import './style.css'
import {cn as bem} from "@bem-react/classname";
import {Link} from 'react-router-dom';

function ToHomePage(){
    const cn = bem('Home');

    return (
        <div className={cn()}><Link className={cn('link')} to='/'>Главная</Link></div>
    )
}

export default ToHomePage;