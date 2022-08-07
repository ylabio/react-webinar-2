import React, {useCallback, useState} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Item({item, onCartAdd, onCartDelete, inCart}) {
  const cn = bem('Item');

  const callbacks = {
      onCartDelete: useCallback((e) => {
          onCartDelete(item.code);
      }, [onCartDelete, item]),

      onCartAdd: useCallback(() => {
          onCartAdd(item);
      }, [onCartAdd, item])
  };

  return (
      <div className={cn()}>
          <div className={cn('number')}>
              {item.code}
          </div>
          <div className={cn('title')}>
              {item.title}
          </div>
          <div className={cn('price')}>
              {item.price.toLocaleString('ru-RU')}<span>₽</span>
          </div>
          {inCart &&
          <div className={cn('quantity')}>    
              <>{item.quantity}<span>  шт</span></>
          </div>}
          <div className={cn('actions')}>
              {inCart ?
                  <button onClick={callbacks.onCartDelete}>Удалить</button> :
                  <button onClick={callbacks.onCartAdd}>Добавить</button>}
          </div>
      </div>
  );
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onCartAdd: propTypes.func,
  onCartDelete: propTypes.func,
  inCart: propTypes.bool.isRequired,
};

Item.defaultProps = {
  item: {},
    onCartAdd: () => {},
    onCartDelete: () => {},
    inCart: false
};

export default React.memo(Item);
