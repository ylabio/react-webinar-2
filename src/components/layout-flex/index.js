import React from 'react';
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";
import './style.css';

function LayoutFlex({children, flex, indent, flexDirection, alignItems, marginItems, widthItems}){
  const cn = bem('LayoutFlex');

  return (
    <div className={cn({flex, indent, flexDirection, alignItems, marginItems, widthItems})}>
      {React.Children.map(children, (child) => (
        child && <div key={child.key} className={cn('item')}>{child}</div>
      ))}
    </div>
  )
}

LayoutFlex.propTypes = {
  children: propTypes.node,
  flex: propTypes.oneOf(['start', 'end',' between']),
  indent: propTypes.oneOf(['small', 'big', 'very-big']),
	flexDirection: propTypes.oneOf(['column']),
	alignItems: propTypes.oneOf(['start']),
	marginItems: propTypes.oneOf(['0']),
	widthItems: propTypes.oneOf(['auto', '100'])
}

LayoutFlex.defaultProps = {
  flex: 'start'
}

export default React.memo(LayoutFlex);
