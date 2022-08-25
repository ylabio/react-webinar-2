import React from "react";
import {cn as bem} from "@bem-react/classname";
import './style.css';
import {Link} from 'react-router-dom'
import useTranslate from "../../hooks/use-translate";

function Entrance({initAuth}){
    const cn = bem('Entrance');

    const {t} = useTranslate();

    return(
        <div className={cn()}><button><Link to={"/login"}>{`${t('enter')}`}</Link></button></div>
    )
}

export default React.memo(Entrance)