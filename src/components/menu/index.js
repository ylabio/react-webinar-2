import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './styles.css';


function Menu({children}) {
  const cn = bem('Menu');
  return (
    <div className={cn()}>
      {children}
    </div>
  )
}

Menu.propTypes = {
  children: propTypes.node,
}

Menu.defaultProps = {
}

export default React.memo(Menu);
