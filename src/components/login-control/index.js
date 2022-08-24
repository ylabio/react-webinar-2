import React from "react";
import propTypes from 'prop-types';
import { Link } from "react-router-dom";
import {cn as bem} from "@bem-react/classname";

import './style.css';

function LoginControl({t, userName, onLogOut}) {
    const cn = bem('LoginControl');

    return (
        <div className={cn()}>
            <Link to="/profile"><p className={cn('name')}>{userName}</p></Link>
            {userName ? 
                <button onClick={() => onLogOut()} className={cn('button')}>{t('exit')}</button> 
                : 
                <Link to="/login"><button className={cn('button')}>{t('entry')}</button></Link>}
        </div>

    )

}

LoginControl.defaultProps = {
    userName: '',
  }

export default React.memo(LoginControl);