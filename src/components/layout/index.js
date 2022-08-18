import {cn as bem} from '@bem-react/classname';
import propTypes from 'prop-types';
import React, {useCallback} from 'react';
import './style.css';

function Layout({head, children, curLang, setLang}) {
  const cn = bem('Layout');

  const callbacks = {
    setRuLang: useCallback(() => setLang('ru'), []),
    setEnLang: useCallback(() => setLang('en'), [])
  };

  return (
    <div className={cn()}>
      <div className={cn('head')}>
        {head}
        {curLang === 'en' ? (
          <button  onClick={callbacks.setRuLang}>
            RUS
            {/* <img src='src\assets\ru.png'/> */}
            </button>
        ) : (
          <button onClick={callbacks.setEnLang}>
            ENG
            {/* <img src="src\assets\eng.png" /> */}
          </button>
        )}
      </div>
      <div className={cn('content')}>{children}</div>
    </div>
  );
}

Layout.propTypes = {
  head: propTypes.node,
  children: propTypes.node,
  curLang: propTypes.string,
  setLang: propTypes.func
};

Layout.defaultProps = {};

export default React.memo(Layout);
