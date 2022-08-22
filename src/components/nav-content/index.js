import React from 'react';
import {Link} from "react-router-dom";
import {cn as bem} from "@bem-react/classname";
import './style.css';
import propTypes from "prop-types";


const NavContent = ({token, name, onExit}) => {
    const cn = bem('Nav')
    return (
        <nav className={cn()}>
            {token !== '' ?
                <>
                    <Link className={cn('link')} to={'/profile'}>
                        {name}
                    </Link>

                    <button onClick={() => onExit()}>
                        Выход
                    </button>
                </>
                :
                <Link className={cn('button')} to={'/login'}>Вход</Link>}
        </nav>
    );
};

NavContent.propTypes = {
    token: propTypes.string,
    name: propTypes.string,
    onExit: propTypes.func
}

export default NavContent;