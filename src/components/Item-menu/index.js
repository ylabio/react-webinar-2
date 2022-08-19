import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';


function ItemMenu({name, onLink}) {
  const cn = bem('MenuItem');

  return (
    <div className={cn()}>
      <div className={cn('link')} onClick={onLink}>{name}</div>
    </div>
  )
}

ItemMenu.propTypes = {
  onLink: propTypes.func.isRequired,
  name: propTypes.string.isRequired,
}

ItemMenu.defaultProps = {
}

export default React.memo(ItemMenu);
