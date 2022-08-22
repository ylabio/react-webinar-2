import React, { useState } from 'react'
import './style.css'
import propTypes from 'prop-types';
import LinkMenu from './../../linkMenu/index';
import { Navigate, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
function LoginForm({ loginUser,
    error, token,
    exitUser, deleteUser,
    data, handleChange,
}) {
  
    
    const { login, password } = data
    const handleSubmit = (evt) =>{
        evt.preventDefault();
        
      
    }

    return (

        
                <form onSubmit={handleSubmit}>
            <div className='LoginForm'>
                <p className='title'>Вход</p>

                <p className='login'>Логин</p>

                
                <input type="text" name='login' value={login} onChange={handleChange} />
                <p className='password'>Пароль</p>
                <input type="password" name='password' value={password} onChange={handleChange} />
                {
                    error ? <div className='wrapper-error'><p>Некая ошибка от сервера</p></div> : null
                }

                

                <button type='submit'>Вход</button>

              

            </div>
                   </form>
        
    )
}
LoginForm.propTypes = {
    loginUser: propTypes.func.isRequired,
    error: propTypes.bool,
    token: propTypes.string,
    exitUser: propTypes.func.isRequired,
    data: propTypes.object.isRequired,
    handleChange: propTypes.func.isRequired,
}
LoginForm.defaultProps = {
    error: false,
    token: '',
}
export default LoginForm