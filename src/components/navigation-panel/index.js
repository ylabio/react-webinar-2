import React from 'react';
import { NavLink } from 'react-router-dom';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import routes from '../../API/routes';
import './style.css';

function NavigationPanel({text, sum, amount, onOpen}) {
  const cn = bem('NavigationPanel');
  
  return (
      <nav className={cn()}>
        <ul className={cn('list')}>
          <li>
            <NavLink className={cn('link')} to={routes.main()}>Главная</NavLink>
          </li>
        </ul>
      </nav>
    )
}

NavigationPanel.propTypes = {

}

NavigationPanel.defaultProps = {

}

export default React.memo(NavigationPanel);
