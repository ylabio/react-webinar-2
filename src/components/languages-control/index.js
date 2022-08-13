import React, {useCallback} from 'react'
import propTypes from "prop-types";
import './style.css'

function LanguagesControl({setLang}) {

  const callbacks = {
    setLanguage: useCallback((e) => {
      const lang = e.target.textContent.toLowerCase()
      setLang(lang)
    })
  }

  return (
    <div className='LanguagesControl'>
      <span onClick={callbacks.setLanguage}>RU</span> / {" "}
      <span onClick={callbacks.setLanguage}>EN</span>
    </div>
  )
}

export default LanguagesControl

LanguagesControl.propTypes = {
  setLang: propTypes.func
}

LanguagesControl.defaultProps = {
  setlang: () => {}
}