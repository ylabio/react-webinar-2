import React from 'react'
import LinkMenu from '../linkMenu'
import './style.css'
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

function LoginButton({ token, deleteUser, path, name }) {



    return (
        token ?
            (
                <div className='Login'>
                    <Link to={path}>{name}</Link>
                    <button onClick={() => deleteUser(token)}>Выход</button>
                </div>
            )
            :
            (
                <div className='Login'>
                    <LinkMenu path={`/login`}><button>Вход</button></LinkMenu>
                </div>
            )
    )
}
LoginButton.propTypes = {
    token: propTypes.string,
    deleteUser: propTypes.func,
    auth: propTypes.bool,
    path: propTypes.string,
    name: propTypes.string
}
LoginButton.defaultProps = {
    token: '',
    path: '',
    name: '',
    deleteUser: () => { },

}
export default LoginButton