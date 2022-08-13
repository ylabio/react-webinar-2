import React from 'react';
import './style.css';
import propTypes from 'prop-types';
import useLanguage from '../../utils/use-language';
import {getLanguageName, getLocalization, LanguageDisplayName} from '../../localization';
function LayoutHead(props) {
  const language = getLocalization(useLanguage())
  return (
    <div className='layoutHead'>
      <h1>{language.store}</h1>
      <select onChange={(e) => props.onLanguageChange(getLanguageName(e.target.value))} value={language.thisLanguage}>
        <option>{LanguageDisplayName.russian}</option>
        <option>{LanguageDisplayName.english}</option>
      </select>
    </div>
  )
}

LayoutHead.propTypes = {
  onLanguageChange: propTypes.func.isRequired
}

export default React.memo(LayoutHead)