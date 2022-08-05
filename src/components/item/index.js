import React, {useCallback, useState} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import plural from 'plural-ru';
import './style.css';

function Item({ item, button, buttonText }) {
  const cn = bem('Item');

  // Счётчик выделений
  // const [count, setCount] = useState(0);

  const callbacks = {
    //
    // onClick: useCallback(() => {
    //   props.onSelect(props.item.code);
    //   if (!props.item.selected) {
    //     setCount(count + 1);
    //   }
    // }, [props.onSelect, props.item, setCount, count]),
    //
    // onDelete: useCallback((e) => {
    //   e.stopPropagation();
    //   props.onDelete(props.item.code)
    // }, [props.onDelete,  props.item])
  };

  return (
    <div className={cn({'selected': item.selected})} onClick={callbacks.onClick}>
      <div className={cn('number')}>
        {item.code}
      </div>
      <div className={cn('title')}>
        {item.title}
        {/*{count ? ` | Выделялось ${count} ${plural(count, 'раз', 'раза', 'раз')}` : null}*/}
      </div>
      <div className={cn('price')}>
        {`${item.price.toLocaleString('ru')}₽`}
      </div>
      {
        item.count &&
        <div className={cn('count')}>
          {`${item.count} шт.`}
        </div>
      }
      <div className={cn('actions')}>
        <button onClick={button}>
          {buttonText}
        </button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  button: propTypes.func,
  buttonText: propTypes.string
}

Item.defaultProps = {
  button: () => {},
  buttonText: 'Кнопка'
}

export default React.memo(Item);
