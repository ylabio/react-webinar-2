import React from 'react'
import './style.css'
import  propTypes  from 'prop-types';
function User() {
  return (
    <div>
    <p className='Profile'>Профиль</p>
    <p>Имя: <span>Саша</span></p>
    <p>Телефон: <span>+70000000001</span></p>
    <p>email: <span>test_50@example.com</span></p>
    </div>
  )
}

export default User