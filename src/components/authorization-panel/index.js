import React from 'react';
import './styles.css';
import {cn as bem} from "@bem-react/classname";
import {Link} from "react-router-dom";

function AuthorizationPanel({isAuthorized}) {
    const cn = bem('Authorization-panel');
    return (
        <div className={cn()}>
            {
                isAuthorized ? <Link className={cn('user-link')} to={'/profile'}>User №1</Link> : ''
            }

            <Link className={cn('button')} to={'/login'}>Вход</Link>
        </div>
    )
}

export default React.memo(AuthorizationPanel);