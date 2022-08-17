import React from "react";
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";
import "./style.css";
import LanguageSelect from "../language-select";

function Layout({head, onLanguageChange, currentLanguage, children}){
  const cn = bem('Layout');

  return (
    <div className={cn()}>
      <div className={cn('head')}>
        {head}
        <LanguageSelect onChange={onLanguageChange}
                        currentLanguage={currentLanguage}/>
      </div>
      <div className={cn('content')}>
        {children}
      </div>
    </div>
  )
}

Layout.propTypes = {
  head: propTypes.node.isRequired,
  children: propTypes.node.isRequired,
  onLanguageChange: propTypes.func,
  currentLanguage: propTypes.string,
}

Layout.defaultProps = {
  onLanguageChange: () => {},
  currentLanguage: 'ru',
}

export default React.memo(Layout);
