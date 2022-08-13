import React, { useCallback } from "react";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import propTypes from 'prop-types';
import Translate from "../../app/translate";

function Header({
  title, 
  changeLanguage, 
  lang,
  flag,
}) {
  const cn = bem('Header');

  const callbacks = {
    switchLang: useCallback((e) => {
      const value = e.target.value;
      if (value === 'Русский') {
        changeLanguage('ru');
      }
      if (value === 'English') {
        changeLanguage('en');
      }
    }, []),
  };

  return (
    <header className={cn()}>
      <h1>
        {flag ? title : <Translate text={title} />}
      </h1>
      <select 
        onChange={callbacks.switchLang}
        value={lang === 'ru' ? 'Русский' : 'English'}
      >
        <option>Русский</option>
        <option>English</option>
      </select>
    </header>
  );
}

Header.propTypes = {
  title: propTypes.string, 
  changeLanguage: propTypes.func.isRequired,
  lang: propTypes.string.isRequired,
  flag: propTypes.bool,
};

Header.defaultProps = {
  title: '',
  flag: false,
}

export default React.memo(Header);
