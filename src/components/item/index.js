import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Item(props) {
  const cn = bem('Item');

  const callbacks = {

    onClickButton: useCallback(()=> {
      props.onCart 
        ? props.onClick(props.item.code) 
        : props.onClick(props.item.title, props.item.price);
    }, [props.onCart, props.onClick, props.item])
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
      {props.onCart && 
        <div className={cn('count')}>
          {props.item.count}
          <span>шт</span>
        </div>
      }
      <div className={cn('actions')}>
        <button onClick={callbacks.onClickButton}>
          {props.onCart ? 'Удалить' : 'Добавить'}
        </button>
      </div>
    </div>
  )
}

Item.propTypes = {
  onCart: propTypes.bool,
  item: propTypes.object.isRequired,
  onClick: propTypes.func.isRequired
}

Item.defaultProps = {
  onCart: false,
  item: {},
  onClick: () => {}
}

export default React.memo(Item);
