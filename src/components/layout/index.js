import React from 'react';
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";
import './style.css';

function Layout({head, children, language, selectLanguage}){
  const cn = bem('Layout');

  return (
    <div className={cn()}>
      <div className={cn('head')}>
        <div>
          {head}
        </div>
        {language && selectLanguage && <div>
          <form>
            <select value={language} onChange={(e)=>selectLanguage(e.target.value)}>
              <option value="RU">RU</option>
              <option value="EN">EN</option>
            </select>
          </form>
        </div>}
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
  language: propTypes.string,
  selectLanguage: propTypes.func
}

Layout.defaultProps = {
}

export default React.memo(Layout);
