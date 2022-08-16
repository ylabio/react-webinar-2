import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import NavMenuItem from '../nav-menu-item';
import './style.css';

function NavMenu(props) {

  const cn = bem('NavMenu');
  return (
    <div className={cn()}>
      {props.links.map(link => <NavMenuItem link={link} key={link.title}/>)}
    </div>
  )
}

export default React.memo(NavMenu);

NavMenu.propTypes = {
  links: propTypes.arrayOf(propTypes.object).isRequired,
}
