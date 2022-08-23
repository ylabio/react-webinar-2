import React from 'react'
import './style.css'
import propTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
function LoginForm({ loginUser, error, data, handleChange,auth }) {
    const { login, password } = data
    async function handleSubmit(evt) {
        evt.preventDefault();
        loginUser(data)
    }
    if (localStorage.getItem('token')) { return <Navigate to={'/profile'} /> }
    return (
        <form onSubmit={handleSubmit}>
            <div className='LoginForm'>
                <p className='title'>Вход</p>
                <p className='login'>Логин</p>
                <input type="text" name='login' value={login} onChange={handleChange} />
                <p className='password'>Пароль</p>
                <input type="password" name='password' value={password} onChange={handleChange} />
                {
                    error ? <div className='wrapper-error'><p>{error}</p></div> : null
                }
                <div className='button-wrapper'>
                    <button disabled={auth}>Войти</button>
                </div>
            </div>
        </form>


    )



}
LoginForm.propTypes = {
    loginUser: propTypes.func.isRequired,
    error: propTypes.any,
    data: propTypes.object.isRequired,
    handleChange: propTypes.func.isRequired,
    auth:propTypes.bool,
}
LoginForm.defaultProps = {
    error: null,
    auth:false,
}
export default LoginForm