import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {getFormattedPrice} from '../../utils';
import './style.css';

function Item(props) {
  const cn = bem('Item');

  const callbacks = {
    onClick: useCallback(() => {
      props.onClick(props.item.code);
    }, [props.onAmountIncrease,  props.item])
  };

  return (
    <li className={cn()}>
      <div className={cn('number')}>
        {props.item.code}
      </div>
      <div className={cn('title')}>
        {props.item.title}
      </div>
      <div className={cn('price')}>
        {`${getFormattedPrice(props.item.price)}`}
      </div>
      <div className={cn('actions')}>
        <button onClick={callbacks.onClick}>
          Добавить
        </button>
      </div>
    </li>
  )
}

Item.propTypes = {
  item: propTypes.exact({
    code: propTypes.number,
    title: propTypes.string,
    price: propTypes.number,
  }),
  onClick: propTypes.func,
}

Item.defaultProps = {
  onAmountIncrease: () => {}
}

export default React.memo(Item);
