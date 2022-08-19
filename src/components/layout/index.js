import React from 'react';
import { cn as bem } from "@bem-react/classname";
import propTypes from "prop-types";
import './style.css';
import ChooseLanguage from "../choose-language";

function Layout({ head, children }) {
  const cn = bem('Layout');

  return (
    <div className={cn()}>
      <div className={cn('head')}>
        {head}
        <div className={cn('language')}>
          <ChooseLanguage />
        </div>
      </div>
      <div className={cn('content')}>
        {children}
      </div>
    </div>
  )
}

Layout.propTypes = {
  head: propTypes.node.isRequired,
  children: propTypes.node.isRequired
}

export default React.memo(Layout);
