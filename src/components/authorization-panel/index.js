import React from 'react';
import './styles.css';
import {cn as bem} from "@bem-react/classname";

function AuthorizationPanel() {
    const cn = bem('Authorization-panel');
    return (
        <div className={cn()}>
            <a className={cn('button')}>Вход</a>
        </div>
    )
}

export default React.memo(AuthorizationPanel);