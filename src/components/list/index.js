import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import Item from "../item";
import './style.css';

function List({items, itemFunc, isInCart}) {
  const cn = bem('List');

  const callbacks = {
    onButtonClick: useCallback((item) => {
      itemFunc(item)
    }, [itemFunc])
  };

  return (
    <div className={cn()}>{items.map((item, index) =>
      <div key={item.code} className={cn('item')}>
        {isInCart === true ?
        <Item item={item} number={index + 1}>
          <button onClick={() => callbacks.onButtonClick(item)}>
            Удалить
          </button>
        </Item>
        :
        <Item item={item}>
          <button onClick={() => callbacks.onButtonClick(item)}>
            Добавить
          </button>
        </Item>}
      </div>
    )}
    </div>
  )
}

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  itemFunc: propTypes.func,
  isInCart: propTypes.bool,
}

List.defaultProps = {
  items: [],
  itemFunc: () => {},
  isInCart: false
}

export default React.memo(List);
