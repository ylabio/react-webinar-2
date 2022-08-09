import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from "@bem-react/classname";
import Item from "../item";
import './style.css';

function List(props) {
  const cn = bem('List');

  return (
    <div className={cn()}>{props.items.map(item =>
      <div key={item.code} className={cn('item')}>
        <Item item={item} callback={props.callback} isCart={props.isCart} />
      </div>
    )}
      {props.isCart
        ? <div className={cn('bottom')}>Итого <span>{props.sum.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB', minimumFractionDigits: 0 })}</span></div>
        : null
      }
    </div>
  )
}

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  isCart: propTypes.bool,
  callback: propTypes.func
}

List.defaultProps = {
  items: [],
  isCart: false,
  callback: () => { }
}

export default React.memo(List);
