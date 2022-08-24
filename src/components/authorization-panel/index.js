import React from 'react';
import './styles.css';
import {cn as bem} from "@bem-react/classname";
import {Link} from "react-router-dom";

function AuthorizationPanel({isAuthorized = false, onLogout, userName}) {
    const cn = bem('Authorization-panel');

    return (
        <div className={cn()}>
            {
                isAuthorized
                  ? <Link className={cn('user-link')} to={'/profile'}>{userName}</Link>
                  : ''
            }

            {!isAuthorized && <Link className={cn('button')} to={'/login'}>{'Вход'}</Link>}
            {isAuthorized && <button className={cn('button')} onClick={onLogout}>{'Выход'}</button>}
        </div>
    )
}

export default React.memo(AuthorizationPanel);
