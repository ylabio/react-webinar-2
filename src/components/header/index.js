import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from "@bem-react/classname";
import './style.css';

function Header({ title, changeLang, lang }) {
  const cn = bem('Header');

  return (
    <div className={cn()}>
      <h1 className={cn('title')}>{title}</h1>
      <div className={cn('languages')}>
        <label>
          <input onChange={(e) => changeLang(e.target.value)} type="radio" name="lang" value="ru" checked={lang === 'ru'}></input>
          RU
        </label>
        <label>
          <input onChange={(e) => changeLang(e.target.value)} type="radio" name="lang" value="en" checked={lang === 'en'}></input>
          EN
        </label>
      </div>
    </div>
  )
}


Header.propTypes = {
  title: propTypes.string.isRequired,
  changeLang: propTypes.func,
  lang: propTypes.string,
}

Header.defaultProps = {
  changeLang: () => { },
  lang: 'ru'
}

export default React.memo(Header);