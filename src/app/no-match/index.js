import React from 'react'
import {Link} from 'react-router-dom'
import Layout from '../../components/layout';
import Translate from '../../components/translate';
import './style.css'

function NoMatch() {

  return (
    <Layout head={<h1><Translate>Страница не найдена</Translate></h1>}>
      <div className='NoMatch'>
        <Translate>Увы, такой страницы не существует.</Translate><br />
        <Link to='/'><Translate>Вернуться на главную</Translate></Link>
      </div>
    </Layout>
    
  )
}

export default NoMatch