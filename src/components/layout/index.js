import React, {useCallback} from 'react';
import {useLocation} from 'react-router-dom';
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";
import useStore from '../../utils/use-store';
import LanguagesControl from '../languages-control';
import './style.css';

function Layout(props){
  const cn = bem('Layout');
  const store = useStore()

  const callbacks = {
    setLanguage: useCallback((lang) => store.get('lang').setLanguage(lang), []),
  };

  return (
    <div className={cn()}>
      <div className={cn('head')}>
        {props.head}
        <LanguagesControl setLang={callbacks.setLanguage}/>
      </div>
      <div className={cn('content')}>
        {props.children}
      </div>
    </div>
  )
}

Layout.propTypes = {
  head: propTypes.node,
  setLang: propTypes.func
}

Layout.defaultProps = {
  setLang: () => {}
}

export default React.memo(Layout);
