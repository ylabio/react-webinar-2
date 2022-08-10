import { cn as bem } from "@bem-react/classname";
import propTypes from 'prop-types';
import React from 'react';
import Item from "../item";
import './style.css';

function List(props) {
  const cn = bem('List');

  return (
    <div className={cn()}>{props.items.map(item =>
      <div key={item.code} className={cn('item')}>
        <Item item={item} label={props.buttonsLabel} onAction={props.buttonsAction}/>
      </div>
    )}
    </div>
  )
}

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  buttonsLabel: propTypes.string.isRequired,
  buttonsAction: propTypes.func.isRequired
}

List.defaultProps = {
  items: [],
  buttonsAction: () => {}
}

export default React.memo(List);