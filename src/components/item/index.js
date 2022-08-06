import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {getFormattedPrice} from '../../utils';
import './style.css';

function Item(props) {
  const cn = bem('Item');

  const callbacks = {
    onAmountIncrease: useCallback(() => {
      props.onAmountIncrease(props.item.code);
    }, [props.onAmountIncrease,  props.item])
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
        {`${getFormattedPrice(props.item.price)}`}
      </div>
      <div className={cn('actions')}>
        <button onClick={callbacks.onAmountIncrease}>
          Добавить
        </button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onAmountIncrease: propTypes.func.isRequired
}

Item.defaultProps = {
  onAmountIncrease: () => {}
}

export default React.memo(Item);