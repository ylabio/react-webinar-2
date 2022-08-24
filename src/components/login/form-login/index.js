import React from 'react'
import './style.css'
import propTypes from 'prop-types';
import CheckUser from '../../../hoc/CheckUser';


function LoginForm({ loginUser, error, data, handleChange, auth,_id }) {
    const { login, password } = data
    async function handleSubmit(evt) {
        evt.preventDefault();
        console.log('1');
        await loginUser(data)


    }


    return (
        <CheckUser path={'/profile'}  auth={localStorage.getItem('token')} id={localStorage.getItem('id')}>
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
        </CheckUser>

    )



}
LoginForm.propTypes = {
    loginUser: propTypes.func.isRequired,
    error: propTypes.any,
    data: propTypes.object.isRequired,
    handleChange: propTypes.func.isRequired,
    auth: propTypes.bool,
    _id:propTypes.string,
}
LoginForm.defaultProps = {
    error: null,
    auth: false,
    _id:'',
}
export default LoginForm