import React from 'react';
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";
import './style.css';
 
function Language(props){
  const cn = bem('Language');

  return (
    <div className={cn()}>
      <button className={cn('select')} onClick={props.changeLanguage}>
          {props.language}
      </button>
    </div>
  )
}

Language.propTypes = {
  language: propTypes.string.isRequired,
  changeLanguage: propTypes.func.isRequired
}

export default React.memo(Language);
