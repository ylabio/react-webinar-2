import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import { convertPrice } from '../../utils';

function BasketItem(props) {
  const cn = bem('Item');

  const price = convertPrice(props.item.price, 'ru', 'RUB');

  const handleClick = () => {
    props.callback(props.item);
  }

  return (
    <div className={cn({'selected': props.item.selected})}>
      <div className={cn('number')}>{props.position}</div>
      <div className={cn('title')}>
        <span>{props.item.title}</span>
        <div className={cn({'price': true})}>
          <span>{price}</span>
          <span>{props.item.count} шт</span>
        </div>
      </div>
      <div className={cn('actions')}>
        <button onClick={handleClick}>{props.text}</button>
      </div>
    </div>
  )
}

BasketItem.propTypes = {
  item: propTypes.object.isRequired,
  position: propTypes.number,
  text: propTypes.string.isRequired,
  onAddItem: propTypes.func,
}

BasketItem.defaultProps = {
  onAddItem: () => {},
}

export default React.memo(BasketItem);
