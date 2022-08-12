import React from 'react'
import useStore from '../../utils/use-store'
import './style.css'

function LanguagesControl() {
  const store = useStore()
  return (
    <div className='LanguagesControl'>
      <span onClick={() => store.get('lang').setLanguage('ru')}>RU</span> / {" "}
      <span onClick={() => store.get('lang').setLanguage('en')}>EN</span>
    </div>
  )
}

export default LanguagesControl