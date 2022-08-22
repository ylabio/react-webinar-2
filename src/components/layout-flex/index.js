import React from 'react';
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";
import './style.css';

function LayoutFlex({children, flex, flexDirection, alignItems, padding, backgroundColor}){
  const cn = bem('LayoutFlex');

  return (
    <div className={cn({flex, flexDirection, alignItems, padding, backgroundColor})}>
      {React.Children.map(children, (child) => (
        <div key={child.key} className={cn('item')}>{child}</div>
      ))}
    </div>
  )
}

LayoutFlex.propTypes = {
  children: propTypes.node,
  flex: propTypes.oneOf(['start', 'end', 'between']),
	flexDirection: propTypes.oneOf(['row', 'column']),
	alignItems: propTypes.oneOf(['start', 'center', 'end']),
	padding: propTypes.oneOf(['10-20', '20-20', '40-20']),
	backgroundColor: propTypes.oneOf(['white', 'gray']),
}

LayoutFlex.defaultProps = {
  flex: 'start',
	flexDirection: 'row',
	alignItems: 'center',
	padding: '20-20',
	backgroundColor: 'white',
}

export default React.memo(LayoutFlex);
