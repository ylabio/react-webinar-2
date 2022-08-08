import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import {currencySign} from '../../utils';

function Item(props) {
  const sequenceNumberInCart = props.items.indexOf(props.item) + 1;

  const callbacks = {
    onClick: useCallback(() => {
      props.onButtonClick(props.item.code);
    }, [props.onButtonClick, props.item])
  };

  const cn = bem('Item');
  return (
    <div className={cn({selected: props.item.selected})}>
      <div className={cn('number')}>
        {props.cartItem ? sequenceNumberInCart : props.item.code}
      </div>
      <div className={cn('title')}>{props.item.title}</div>
      <div className={cn('price')}>
        {props.item.price.toLocaleString()} {currencySign}
      </div>
      {props.cartItem && (
        <div className={cn('amount')}>{props.item.amount} шт</div>
      )}

      <div className={cn('actions')}>
        <button onClick={callbacks.onClick}>
          {props.cartItem ? 'Удалить' : 'Добавить'}
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  items: propTypes.array,
  onClick: propTypes.func,
  cartItem: propTypes.bool
};

Item.defaultProps = {
  onClick: () => {},
  cartItem: false
};

export default React.memo(Item);
