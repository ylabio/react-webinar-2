import React from 'react';
import { NavLink } from 'react-router-dom';
import propTypes from 'prop-types';
import plural from "plural-ru";
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/numberFormat";
import './styles.css';


function Menu() {

  const cn = bem('Menu');
  return (
    <div className={cn()}>
      <div className={cn('onMain')}>
        <NavLink to={'/'}> Главная </NavLink>
      </div>
    </div>
  )
}

export default React.memo(Menu);
