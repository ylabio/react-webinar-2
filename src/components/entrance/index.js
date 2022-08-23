import React from "react";
import {cn as bem} from "@bem-react/classname";
import './style.css';
import {Link} from 'react-router-dom'
import useTranslate from "../../hooks/use-translate";

function Entrance(){
    const cn = bem('Entrance');

    const {t} = useTranslate();
    
    const onClickHandler = () => {
    } 

    return(
        <div className={cn()}><button onClick={onClickHandler}><Link to={"/login"}>{`${t('login')}`}</Link></button></div>
    )
}

export default React.memo(Entrance)