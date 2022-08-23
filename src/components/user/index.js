import React from 'react'
import './style.css'
import propTypes from 'prop-types';
function User({ user }) {
  return (
    <div className='User'>
      <p className='Profile'>Профиль</p>
      <p>Имя: <span>{user.userName}</span></p>
      <p>Телефон: <span>{user.telephone}</span></p>
      <p>email: <span>{user.email}</span></p>
    </div>
  )
}
User.propTypes = {
  user: propTypes.object.isRequired
}
export default User