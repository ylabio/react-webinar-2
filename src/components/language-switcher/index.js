import React, {useCallback, useEffect} from "react";
import propTypes from 'prop-types';
import plural from "plural-ru";
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/numberFormat";
import './styles.css';
import { Link, BrowserRouter as Router, Route } from "react-router-dom";


function LanguageSwitcher({changeLanguage}) {

  const cn = bem('LanguageSwitcher');

  const callbacks = {
    changeLanguage: useCallback((lang) => changeLanguage(lang), []),
  };

  return (
      <div className={cn()}>
      <button onClick={callbacks.changeLanguage('ru')} className={cn('langButton')}>
        РУС
      </button>
      <button onClick={callbacks.changeLanguage('en')} className={cn('langButton')}>
        ENG
      </button>
      </div>
  )
}

LanguageSwitcher.propTypes = {
  onOpen: propTypes.func.isRequired,
  sum: propTypes.number,
  amount: propTypes.number
}

LanguageSwitcher.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0
}

export default React.memo(LanguageSwitcher);
