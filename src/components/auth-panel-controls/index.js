import React, {useCallback} from 'react';
import {Link} from "react-router-dom";
import './style.css'

const AuthPanelControls = ({token, user, logOut, isAuth, link}) => {

    const callbacks = {
        logOut: useCallback(() => logOut(token), [token]),
    };
    return (
        <div className='panel-wrapper'>
            {isAuth ?
                <>
                <Link className='panel-link'  to="/profile">
                    {user?.name}
                </Link>
                <button className='panel-btn' onClick={callbacks.logOut}>Выйти</button>
                </>
                :
                <Link to={link}>
                    <button>
                        Вход
                    </button>
                </Link>
            }

        </div>
    );
};

export default AuthPanelControls;