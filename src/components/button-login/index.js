import React from 'react'
import LayoutFlex from '../layout-flex'
import LinkMenu from '../linkMenu'
import './style.css'
import propTypes from 'prop-types';
function LoginButton({ token, deleteUser }) {
    return (
        token.length!==0 ?
            (
                <div className='Login'>
                    <button onClick={() => deleteUser(token)}>Удалить</button>
                </div>
            )
            :
            (
                <div className='Login'>
                    <button><LinkMenu path={`/login`} title='Вход' /></button>
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
    deleteUser:()=>{},
}
export default LoginButton