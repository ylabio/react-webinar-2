import React, { useCallback } from 'react';
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";
import './style.css';

function Layout({head, children, changeLocaleHandler, locale}){
  const cn = bem('Layout');

  const callbacks = {
    // Смена языка интерфейса
    changeLocaleHandler: useCallback((e) => changeLocaleHandler(e.target.value), []),
  };

  return (
    <div className={cn()}>
      <div className={cn('head')}>
        {head}
        <select value={locale} onChange={callbacks.changeLocaleHandler} className={cn('select')}>
          <option>en</option>
          <option defaultChecked>ru</option>
        </select>
      </div>
      <div className={cn('content')}>
        {children}
      </div>
    </div>
  )
}

Layout.propTypes = {
  head: propTypes.node,
  children: propTypes.node,
  changeLocaleHandler: propTypes.func.isRequired,
  locale: propTypes.string.isRequired,
}

Layout.defaultProps = {
}

export default React.memo(Layout);
