import React from "react";
import './style.css';
import {cn as bem} from '@bem-react/classname';
import { Link } from "react-router-dom";
import useTranslate from "../../hooks/use-translate";


function Logout({userName, logout}){


    const {t} = useTranslate();
    const cn = bem('Logout');

    return(
        <>
        <div className={cn()}>
            <div className={cn('link')}><Link to={'/profile'}>{userName}</Link></div>
            <div className={cn('button')}><button onClick={()=>logout()}>{t('exit')}</button></div>   
        </div>
        </>
        
    )
}

export default React.memo(Logout)