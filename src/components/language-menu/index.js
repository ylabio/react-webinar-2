import React from "react";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import propTypes from "prop-types";

function LanguageMenu({languages, selectLanguage}){
  const cn = bem('LanguageMenu');

  return (
    <div className={cn()}>
      {languages.map((language, i) => {
        return <span key={i} className={cn("language")} onClick={() => {selectLanguage(language)}}>
          {language}
        </span>
      })}
    </div>
  )
}

LanguageMenu.propTypes = {
  languages: propTypes.array.isRequired,
}

LanguageMenu.defaultProps = {
  languages: [],
}
export default React.memo(LanguageMenu);