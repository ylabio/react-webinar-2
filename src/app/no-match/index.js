import React from 'react'
import {Link} from 'react-router-dom'
import Layout from '../../components/layout';
import useTranslate from '../../utils/use-translate';
import './style.css'

function NoMatch() {
  const translate = useTranslate()

  return (
    <Layout head={<h1>{translate('Страница не найдена')}</h1>}>
      <div className='NoMatch'>
        {translate('Увы, такой страницы не существует.')}<br />
        <Link to='/'>{translate('Вернуться на главную')}</Link>
      </div>
    </Layout>
    
  )
}

export default NoMatch