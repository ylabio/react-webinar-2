import React from 'react'
import LayoutFlex from '../layout-flex'
import LinkMenu from '../linkMenu'
import './style.css'
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
function LoginButton({ token, deleteUser }) {
    return (
        localStorage.getItem('token') ?
            (
                <div className='Login'>
                    <Link to={'/profile'}>{localStorage.getItem('name')}</Link>
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

}
LoginButton.defaultProps = {
    token: '',
    deleteUser: () => { },
}
export default LoginButton