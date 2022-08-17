import React from 'react';
import {Link} from 'react-router-dom';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';


function NavMenu(props) {
  const cn = bem('NavMenu');
  return (
    <div className={cn()}>
      {props.menuItems.map((item, index) =>  
        <Link to={`${item.link}`} className={cn('link') } key={`${index}${item.title}`}>
          {item.title}
        </Link>
      )}
    </div>
  )
}

NavMenu.propTypes = {
  menuItems: propTypes.arrayOf(propTypes.object).isRequired
}

NavMenu.defaultProps = {
}

export default React.memo(NavMenu);