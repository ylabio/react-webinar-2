import React from 'react';
import { useNavigate } from 'react-router-dom';
import {cn as bem} from "@bem-react/classname";
import "./style.css"

function NotFound() {
    const navigate = useNavigate();
    const cn = bem('NotFound');

    const callbacks = {
        navigate: React.useCallback(()=> navigate("/"))
    }

    return(
        <div className={cn()}>
            <h1>404 Страница не найдена!</h1>
            <p className={cn('link')} onClick={
                callbacks.navigate
            }>Главная</p>
        </div>
    )
}

export default NotFound
