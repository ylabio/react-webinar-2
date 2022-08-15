import React from 'react';
import {cn as bem} from "@bem-react/classname";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import propTypes from "prop-types";
import './style.css';

function Layout({head, children}){
  const cn = bem('Layout');

  const store = useStore(); 

  const select = useSelector(state => ({
    lang: state.localization.lang
  }));

  return (
    <div className={cn()}>
      <div className={cn('head')}>
        {head}
        <button className={cn('langBtn')} onClick={() => {store.get('localization').setLang()}}>
          {select.lang}
        </button>
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
}

Layout.defaultProps = {
}

export default React.memo(Layout);
