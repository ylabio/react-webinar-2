import React, { useCallback } from "react";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Header({title, changeLanguage, lang}) {
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
      <h1>{title}</h1>
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

export default React.memo(Header);