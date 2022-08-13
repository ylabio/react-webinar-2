import React from 'react'
import {Link} from 'react-router-dom'
import Translate from '../../components/translate';
import './style.css'

function NoMatch() {

  return (
    <div className='NoMatch'>
      <Translate>Увы, такой страницы не существует.</Translate><br />
      <Link to='/'><Translate>Вернуться на главную</Translate></Link>
    </div>
  )
}

export default NoMatch