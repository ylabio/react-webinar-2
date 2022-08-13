import React from 'react';
import './style.css';
import propTypes from 'prop-types';
function LayoutHead(props) {
  const getLanguageName = (languageName) => {
    switch(languageName) {
      case "Русский":
        return "russian"
      case "English":
        return "english"
      default:
        return "russian"
    }
  }
  const getLanguageOptionName = (languageVar) => {
    switch(languageVar) {
      case "russian":
        return "Русский"
      case "english":
        return "English"
      default:
        return "Неизвестный"
    }
  }
  return (
    <div className='layoutHead'>
      <h1>{props.title}</h1>
      <select onChange={(e) => props.onLanguageChange(getLanguageName(e.target.value))}
              value={getLanguageOptionName(props.language)}>
        <option>Русский</option>
        <option>English</option>
      </select>
    </div>
  )
}

LayoutHead.propTypes = {
  onLanguageChange: propTypes.func.isRequired,
  language: propTypes.string.isRequired,
  title: propTypes.string.isRequired
}

export default React.memo(LayoutHead)