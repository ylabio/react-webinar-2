import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Item(props) {
  const cn = bem('Item');

  const callbacks = {
      onButton: useCallback(() => {
          props.onButton(props.item.code);
      }, [props.item.code])
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
        {props.item.price.toLocaleString('ru-RU')} ₽
      </div>
      <div className={props.item.quantity ? cn('quantity') : cn('quantity_hidden')}>
        {console.log('Quantity')}
        {console.log(props.item)}
        {props.item.quantity} шт
      </div>
      <div className={cn('actions')}>
        <button onClick={callbacks.onButton}>
          {props.buttonText}
        </button>
      </div>
    </div>
  )
}

// Item.propTypes = {
//   item: propTypes.object.isRequired,
//   onSelect: propTypes.func.isRequired,
//   onDeleted: propTypes.func.isRequired
// }

// Item.defaultProps = {
//   onSelect: () => {},
//   onDeleted: () => {}
// }

export default React.memo(Item);
