import React from 'react';
import propTypes, { arrayOf } from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import { Link } from 'react-router-dom';
import './style.css';

function Menu({menuItems}) {
  const cn = bem('Menu');

  return (
    <div className={cn()}>
      {menuItems.map(item =>
        <div className={cn('menuItem')} key={item.id}>
          <Link to={item.link}>
            {item.title}
          </Link>
        </div>
      )}
    </div>
  )
}

Menu.propTypes = {
  menuItems: arrayOf(propTypes.object).isRequired
}

export default React.memo(Menu);
