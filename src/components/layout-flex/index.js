import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './styles.css';


function LayoutFlex({children}) {
  const cn = bem('LayoutFlex');
  return (
    <div className={cn()}>
      {children}
    </div>
  )
}

LayoutFlex.propTypes = {
  children: propTypes.node,
}

LayoutFlex.defaultProps = {
}

export default React.memo(LayoutFlex);
