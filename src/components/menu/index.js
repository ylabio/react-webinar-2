import React from 'react';
import propTypes from 'prop-types';
import plural from "plural-ru";
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/numberFormat";
import './styles.css';
import { Link, BrowserRouter as Router, Route } from "react-router-dom";
import LanguageSwitcher from '../language-switcher';


function Menu({translate}) {

  const cn = bem('Menu');

  return (
      <div className={cn()}>
      <div className={cn('links')}>
        <Link to="/" className={cn('linkMain')}>{translate('menu-main')}</Link>
      </div>
      </div>
  )
}

Menu.propTypes = {
  onOpen: propTypes.func.isRequired,
  sum: propTypes.number,
  amount: propTypes.number
}

Menu.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0
}

export default React.memo(Menu);
