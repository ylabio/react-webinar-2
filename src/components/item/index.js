import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Item(props) {
  const cn = bem('Item');
  const price = Intl.NumberFormat("ru").format(props.item.price);

    const callbacks = {
        onAdd: useCallback(() => {
            props.onAdd(props.item.code, 1)
        }, [props.onAdd, props.item]),
    };

  return (
    <div className={cn()}>
      <div className={cn('number')}>
        {props.item.code}
      </div>
      <div className={cn('title')}>
        {props.item.title}
      </div>
      <div className={cn('actions')}>
          <div className={cn('wrapper')}>
            <p className={cn('price')}>{price +' ₽'}</p>
            <button onClick={callbacks.onAdd}>
              Добавить
            </button>
          </div>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onAdd: propTypes.func.isRequired
}

export default React.memo(Item);
