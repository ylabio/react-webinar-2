import React, { useCallback } from 'react';
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";
import './style.css';
import useStore from '../../utils/use-store';
import useSelector from '../../utils/use-selector';

function Layout({head, children}){
  const cn = bem('Layout');
  const store = useStore();
  const locale = useSelector(state => state.app.locale);

  const callbacks = {
    // Смена языка интерфейса
    changeLocaleHandler: useCallback((e) => store.get('app').changeLocale(e.target.value), []),
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
}

Layout.defaultProps = {
}

export default React.memo(Layout);
