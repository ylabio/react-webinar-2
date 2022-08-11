import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Item(props) {
  const cn = bem('Item');

  // Счётчик выделений
  const actionButton = () => {
    props.actionButton(props.item);
  };

  return (
    <div className={cn()}>
      <div className={cn('number')}>
        {props.item.code}
      </div>
      <div className={cn('title')}>
        {props.item.title}
      </div>
      <div className={cn('price')}>
        {props.item.price}<p>₽</p>
      </div>
        {props.item.amount > 0 && <div className={cn('amount')}> {props.item.amount + 'шт.'} </div>}
      <div className={cn('actions')}>
        <button onClick={actionButton}>
          {props.textButton}
        </button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  actionButton: propTypes.func.isRequired
}

Item.defaultProps = {
    actionButton: () => {},
}

export default React.memo(Item);
