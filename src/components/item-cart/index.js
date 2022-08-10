import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function ItemCart(props) {
  const cn = bem('Item-cart');

  const callbacks = {
    onClickButton: useCallback(()=> {
      props.onClick(props.item.code);
    }, [props.onClick, props.item])
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
        {props.item.price.toLocaleString('ru')}
        <span>₽</span>
      </div>
      <div className={cn('count')}>
        {props.item.count}
        <span>шт</span>
      </div>
      <div className={cn('actions')}>
        <button onClick={callbacks.onClickButton}>
          Удалить
        </button>
      </div>
    </div>
  )
}

ItemCart.propTypes = {
  item: propTypes.object.isRequired,
  onClick: propTypes.func
}

ItemCart.defaultProps = {
  onClick: () => {}
}

export default React.memo(ItemCart); 