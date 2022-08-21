import React, {useCallback} from 'react';
import {Link} from "react-router-dom";
import './style.css'

const AuthPanelControls = ({token, user, logOut}) => {

    const callbacks = {
        logOut: useCallback(() => logOut(token), [token]),
    };
    return (
        <div>
            <Link className='panel-link'  to="/profile">
                {user?.name}
            </Link>
            <button className='panel-btn' onClick={callbacks.logOut}>Выйти</button>
        </div>
    );
};

export default AuthPanelControls;