import React from 'react'
import {Link} from 'react-router-dom'
import './style.css'

function NoMatch() {
  return (
    <div className='NoMatch'>
      Увы, такой страницы не существует.<br />
      <Link to='/'>Вернуться на главную</Link>
    </div>
  )
}

export default NoMatch