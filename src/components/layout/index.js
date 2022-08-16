import React from 'react';
import { cn as bem } from '@bem-react/classname';
import propTypes from 'prop-types';
import './style.css';
import ToggleLanguages from '../toggle-languages';

function Layout({ head, children, changeLanguage, language }) {
  const cn = bem('Layout');

  return (
    <div className={cn()}>
      <div className={cn('head')}>
        {head}
        <ToggleLanguages changeLanguage={changeLanguage} language={language} />
      </div>
      <div className={cn('content')}>{children}</div>
    </div>
  );
}

Layout.propTypes = {
  head: propTypes.node,
  children: propTypes.node,
  changeLanguage: propTypes.func.isRequired,
  language: propTypes.string.isRequired,
};

Layout.defaultProps = {};

export default React.memo(Layout);
