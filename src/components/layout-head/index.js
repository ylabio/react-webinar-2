import React from 'react';
import './style.css';
import propTypes from 'prop-types';
import {localization} from '../../utils/translations';
import useSelector from '../../utils/use-selector';
function LayoutHead(props) {
  const langName = useSelector(state => state.languages).language
  const language = localization[useSelector(state => state.languages).language];
  const getValue = (langName) => {
    switch(langName) {
      case "russian":
        return "Русский"
      case "english":
        return "English"
      default:
        return "English"
    }
  }
  return (
    <div className='layoutHead'>
      <h1>{language.store}</h1>
      <select onChange={(e) => props.onLanguageChange(e.target.value)} value={getValue(langName)}>
        <option>Русский</option>
        <option>English</option>
      </select>
    </div>
  )
}

LayoutHead.propTypes = {
  onLanguageChange: propTypes.func.isRequired
}

export default React.memo(LayoutHead)