import React, {useCallback, useState} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import plural from 'plural-ru';
import './style.css';

function Item(props) {
  const cn = bem('Item');

  const callbacks = {

    onClickButton: useCallback(()=> {
      props.onClick(props.item.code)
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
      
      <div className={cn('actions')}>
        <button onClick={callbacks.onClickButton}>
          Добавить
        </button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onClick: propTypes.func
}

Item.defaultProps = {
  onClick: () => {},
}

export default React.memo(Item);
