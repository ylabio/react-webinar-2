import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Item(props) {
  const cn = bem('Item');

  const price = props.item.price.toLocaleString(
    'ru', {style: 'currency', currency: 'RUB', minimumFractionDigits: 0}
  );

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
          {props.children}
        </div>
      </div>
      <div className={cn('actions')}>
        <button onClick={handleClick}>{props.text}</button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  position: propTypes.number,
  text: propTypes.string.isRequired,
  onAddItem: propTypes.func.isRequired,
}

Item.defaultProps = {
  onAddItem: () => {},
}

export default React.memo(Item);
